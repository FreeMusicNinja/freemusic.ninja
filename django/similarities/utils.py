from django.db.models import Q

import echonest
from artists.models import Artist
from echonest.models import SimilarResponse
from users.models import User
from .models import (GeneralArtist, UserSimilarity, Similarity,
                     update_similarities)


def has_similarities(general_artist):
    """Return True EchoNest similarities were already added."""
    return SimilarResponse.objects.filter(
        normalized_name=general_artist.normalized_name).exists()


def make_similarity(echonest_user, other_artist, cc_artist):
    """Make EchoNest similarity between general artist and CC artist."""
    kwargs = {'other_artist': other_artist, 'cc_artist': cc_artist}
    UserSimilarity.objects.get_or_create(defaults={'weight': 1},
                                         user=echonest_user, **kwargs)
    return Similarity.objects.get_or_create(**kwargs)[0]


def add_new_similarities(artist):
    """Add new CC artist similarities for the given artist."""
    user = User.objects.get(email='echonest')
    artist_names = echonest.get_similar(artist.name)
    cc_artists = Artist.objects.filter(name__in=artist_names)
    update_similarities(
        make_similarity(user, artist, cc_artist)
        for cc_artist in cc_artists
    )


def get_similar(name):
    artist, _ = GeneralArtist.objects.get_or_create(
        normalized_name=name.upper(), defaults={'name': name})
    if not has_similarities(artist):
        add_new_similarities(artist)
    similar = Q(similarity__other_artist=artist, similarity__weight__gt=0)
    return Artist.objects.filter(similar).order_by('-similarity__weight')
