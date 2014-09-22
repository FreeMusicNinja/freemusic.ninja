from rest_framework import generics
from artists.serializers import ArtistSerializer
from .utils import get_similar


class SimilarArtistList(generics.ListAPIView):

    """API endpoint for querying artists similar to given artist."""

    serializer_class = ArtistSerializer

    def get_queryset(self):
        return get_similar(self.request.GET.get('name', ""))
