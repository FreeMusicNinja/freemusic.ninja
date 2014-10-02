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
                if self.request.user == self.object
                else UserSerializer)
