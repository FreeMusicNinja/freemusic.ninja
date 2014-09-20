from artists.models import Artist
from rest_framework import generics, viewsets, permissions
from artists.serializers import ArtistSerializer
from similarities.utils import get_similar


class ArtistViewSet(viewsets.ModelViewSet):

    """API endpoint that allows artists to be viewed or edited"""

    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    filter_fields = ('name',)

    def get_queryset(self):
        """Limit results to at most 100."""
        return super().get_queryset()[:100]


class SimilarArtistList(generics.ListAPIView):

    """API endpoint for querying artists similar to given artist."""

    serializer_class = ArtistSerializer

    def get_queryset(self):
        return get_similar(self.request.GET.get('name', ""))
