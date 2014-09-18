from artists.models import Artist
from rest_framework import viewsets, permissions
from artists.serializers import ArtistSerializer


class ArtistViewSet(viewsets.ModelViewSet):

    """API endpoint that allows artists to be viewed or edited"""

    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_fields = ('name',)

    def get_queryset(self):
        """Limit results to at most 100."""
        return super().get_queryset()[:100]
