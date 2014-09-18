from django.db import models
from model_utils.models import TimeStampedModel

from .managers import ArtistManager


class Artist(TimeStampedModel):

    """Music artist served over the API."""

    name = models.CharField(max_length=100, unique=True)
    objects = ArtistManager()


class JamendoArtist(TimeStampedModel):

    """Music artist data stored from the Jamendo API."""

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    website = models.URLField()
    joindate = models.DateField()
    image = models.URLField()
    shorturl = models.URLField()
    shareurl = models.URLField()


class MagnatuneArtist(TimeStampedModel):

    """Music artist data stored from the Magnatune sqlite database."""

    artist = models.CharField(max_length=100, unique=True)
    description = models.TextField(max_length=500)
    bio = models.TextField(max_length=12000)
    homepage = models.CharField(max_length=100)
    bandphoto = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
