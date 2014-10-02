from django.shortcuts import redirect
from rest_framework import viewsets

from .models import User
from .permissions import IsUserOrReadOnly
from .serializers import AuthenticatedUserSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):

    """API endpoint for viewing and editing users."""

    queryset = User.objects.all()
    permission_classes = (IsUserOrReadOnly,)

    def get_serializer_class(self):
        return (AuthenticatedUserSerializer
                if self.request.user == self.get_object()
                else UserSerializer)

    def retrieve(self, request, pk=None):
        """Retrieve given user or current user if ``pk`` is "me"."""
        if pk == 'me' and request.user.is_authenticated():
            return redirect('user-detail', request.user.pk)
        else:
            return super().retrieve(request, pk)
