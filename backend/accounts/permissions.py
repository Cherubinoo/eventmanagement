from rest_framework.permissions import BasePermission

from .models import Role


class IsSuperAdmin(BasePermission):
    """Grants access only to authenticated users with the SUPER_ADMIN role."""

    message = 'Only the Super Admin can perform this action.'

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and user.role == Role.SUPER_ADMIN)


class IsOrganizer(BasePermission):
    """Grants access only to authenticated users with the ORGANIZER role."""

    message = 'Only an Organizer can perform this action.'

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and user.role == Role.ORGANIZER)


class IsUser(BasePermission):
    """Grants access only to authenticated users with the USER role."""

    message = 'Only a regular User can perform this action.'

    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and user.role == Role.USER)


class IsSuperAdminOrOrganizer(BasePermission):
    """Grants access to authenticated Super Admins or Organizers."""

    message = 'Only the Super Admin or an Organizer can perform this action.'

    def has_permission(self, request, view):
        user = request.user
        return bool(
            user
            and user.is_authenticated
            and user.role in (Role.SUPER_ADMIN, Role.ORGANIZER)
        )
