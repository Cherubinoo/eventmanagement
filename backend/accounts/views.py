from django.contrib.auth import get_user_model
from django.db import models
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Role
from .permissions import IsSuperAdmin
from .serializers import (
    ChangePasswordSerializer,
    CustomTokenObtainPairSerializer,
    OrganizerCreateSerializer,
    OrganizerUpdateSerializer,
    RegisterSerializer,
    UserActivationSerializer,
    UserSerializer,
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """POST /api/auth/register/ — public signup. Always creates role=USER."""

    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                'user': UserSerializer(user).data,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(TokenObtainPairView):
    """POST /api/auth/login/ — authenticates by email/password, returns role + tokens."""

    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer


class MeView(generics.RetrieveAPIView):
    """GET /api/auth/me/ — the authenticated user's own profile."""

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class OrganizerListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/admin/organizers/ — list all Organizer accounts.
    POST /api/admin/organizers/ — create an Organizer account.
    Restricted to SUPER_ADMIN only.
    """

    permission_classes = [IsSuperAdmin]
    queryset = User.objects.filter(role=Role.ORGANIZER).order_by('-date_joined')

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return OrganizerCreateSerializer
        return UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserSerializer(user).data
        data['temporary_password'] = serializer.temporary_password
        return Response(data, status=status.HTTP_201_CREATED)


class ChangePasswordView(generics.GenericAPIView):
    """
    POST /api/auth/change-password/ — the authenticated user sets a new
    password. Used to complete a first login on a temporary password.
    """

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save(request.user)
        return Response(UserSerializer(user).data, status=status.HTTP_200_OK)


class OrganizerDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/admin/organizers/{id}/ — retrieve one Organizer.
    PATCH  /api/admin/organizers/{id}/ — update name/email/phone.
    DELETE /api/admin/organizers/{id}/ — remove the Organizer account.
    Restricted to SUPER_ADMIN only.
    """

    permission_classes = [IsSuperAdmin]
    queryset = User.objects.filter(role=Role.ORGANIZER)

    def get_serializer_class(self):
        if self.request.method in ('PATCH', 'PUT'):
            return OrganizerUpdateSerializer
        return UserSerializer

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        response = super().update(request, *args, **kwargs)
        response.data = UserSerializer(self.get_object()).data
        return response


class UserListView(generics.ListAPIView):
    """
    GET /api/admin/users/ — list normal User accounts.
    Restricted to SUPER_ADMIN. Supports ?search= (name/email) and
    ?is_active=true|false.
    """

    permission_classes = [IsSuperAdmin]
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.filter(role=Role.USER).order_by('-date_joined')

        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                models.Q(name__icontains=search) | models.Q(email__icontains=search)
            )

        is_active = self.request.query_params.get('is_active')
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() in ('true', '1', 'yes'))

        return queryset


class UserDetailView(generics.RetrieveUpdateAPIView):
    """
    GET   /api/admin/users/{id}/ — view a User's profile.
    PATCH /api/admin/users/{id}/ — activate/deactivate the User.
    Restricted to SUPER_ADMIN only.
    """

    permission_classes = [IsSuperAdmin]
    queryset = User.objects.filter(role=Role.USER)

    def get_serializer_class(self):
        if self.request.method in ('PATCH', 'PUT'):
            return UserActivationSerializer
        return UserSerializer

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        response = super().update(request, *args, **kwargs)
        response.data = UserSerializer(self.get_object()).data
        return response
