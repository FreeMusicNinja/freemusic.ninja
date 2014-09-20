import echonest
from artists.models import Artist
from echonest.models import SimilarResponse
from users.models import User
from .models import (GeneralArtist, UserSimilarity, Similarity,
                     update_similarities)


def add_new_similarities(artist, force_update=False):
    similarities = []
    responses = SimilarResponse.objects.filter(
        normalized_name=artist.normalized_name)
    if responses.exists() and not force_update:
        return  # Echo Nest similarities already added
    user = User.objects.get(email='echonest')
    artist_names = echonest.get_similar(artist.name)
    cc_artists = Artist.objects.filter(name__in=artist_names)
    for cc_artist in cc_artists:
        kwargs = dict(
            cc_artist=cc_artist,
            other_artist=artist,
        )
        UserSimilarity.objects.get_or_create(defaults={'weight': 1},
                                             user=user, **kwargs)
        similarities.append(Similarity.objects.get_or_create(**kwargs)[0])
    update_similarities(similarities)


def get_similar(name):
    artist, _ = GeneralArtist.objects.get_or_create(
        normalized_name=name.upper(), defaults={'name': name})
    add_new_similarities(artist)
    return Artist.objects.filter(similarity__other_artist=artist,
                                 similarity__weight__gt=0)
