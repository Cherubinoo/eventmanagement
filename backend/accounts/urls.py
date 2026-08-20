from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    ChangePasswordView,
    LoginView,
    MeView,
    OrganizerDetailView,
    OrganizerListCreateView,
    RegisterView,
    UserDetailView,
    UserListView,
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='auth-register'),
    path('auth/login/', LoginView.as_view(), name='auth-login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='auth-refresh'),
    path('auth/me/', MeView.as_view(), name='auth-me'),
    path('auth/change-password/', ChangePasswordView.as_view(), name='auth-change-password'),
    path('admin/organizers/', OrganizerListCreateView.as_view(), name='admin-organizers'),
    path('admin/organizers/<int:pk>/', OrganizerDetailView.as_view(), name='admin-organizer-detail'),
    path('admin/users/', UserListView.as_view(), name='admin-users'),
    path('admin/users/<int:pk>/', UserDetailView.as_view(), name='admin-user-detail'),
]
