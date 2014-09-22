from rest_framework import serializers

from artists.models import Artist, Hyperlink


class HyperlinkSerializer(serializers.ModelSerializer):

    display_name = serializers.CharField(source='get_name_display')

    class Meta:
        model = Hyperlink
        fields = ('id', 'display_name', 'name', 'url')


class ArtistSerializer(serializers.ModelSerializer):

    links = HyperlinkSerializer()

    class Meta:
        model = Artist
        fields = ('id', 'name', 'links')
