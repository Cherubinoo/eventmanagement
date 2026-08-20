from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.utils.crypto import get_random_string
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Role

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone', 'role', 'date_joined']
        read_only_fields = fields


class RegisterSerializer(serializers.ModelSerializer):
    """Public self-registration. Always creates a USER — role is never accepted as input."""

    password = serializers.CharField(write_only=True, min_length=8, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['name', 'email', 'phone', 'password', 'password_confirm']

    def validate_email(self, value):
        value = value.lower()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('A user with this email already exists.')
        return value

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('password_confirm'):
            raise serializers.ValidationError({'password_confirm': 'Passwords do not match.'})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        password = validated_data.pop('password')
        user = User(role=Role.USER, **validated_data)
        user.set_password(password)
        user.save()
        return user


class OrganizerCreateSerializer(serializers.ModelSerializer):
    """Super-Admin-only creation of Organizer accounts. Role is fixed server-side."""

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone']
        read_only_fields = ['id']

    def validate_email(self, value):
        value = value.lower()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('A user with this email already exists.')
        return value

    def create(self, validated_data):
        generated_password = get_random_string(12)
        user = User(role=Role.ORGANIZER, **validated_data)
        user.set_password(generated_password)
        user.save()
        self.generated_password = generated_password
        return user


class OrganizerUpdateSerializer(serializers.ModelSerializer):
    """Super-Admin-only partial update of an Organizer's profile fields."""

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'phone']
        read_only_fields = ['id']
        extra_kwargs = {
            'name': {'required': False},
            'email': {'required': False},
            'phone': {'required': False},
        }

    def validate_email(self, value):
        value = value.lower()
        if User.objects.exclude(pk=self.instance.pk).filter(email=value).exists():
            raise serializers.ValidationError('A user with this email already exists.')
        return value


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Authenticates by email/password and returns the user's role and profile."""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['role'] = user.role
        token['name'] = user.name
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        data['user'] = UserSerializer(self.user).data
        return data
