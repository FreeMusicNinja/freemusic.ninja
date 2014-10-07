from rest_framework import permissions


class IsUserOrReadOnly(permissions.BasePermission):

    """Permission to only allow users to edit themselves."""

    def has_object_permission(self, request, view, obj):
        return (request.method in permissions.SAFE_METHODS
                or obj == request.user)
