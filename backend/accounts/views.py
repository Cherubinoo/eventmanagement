from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Role
from .permissions import IsSuperAdmin
from .serializers import (
    CustomTokenObtainPairSerializer,
    OrganizerCreateSerializer,
    OrganizerUpdateSerializer,
    RegisterSerializer,
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
        data['generated_password'] = serializer.generated_password
        return Response(data, status=status.HTTP_201_CREATED)


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
