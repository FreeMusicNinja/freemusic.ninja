from rest_framework import serializers

from artists.models import Artist, Hyperlink


class HyperlinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hyperlink
        fields = ('name', 'url')


class ArtistSerializer(serializers.ModelSerializer):

    links = HyperlinkSerializer()

    class Meta:
        model = Artist
        fields = ('id', 'name', 'links')
