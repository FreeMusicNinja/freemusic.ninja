from django.db import models
import jsonfield
from model_utils.models import TimeStampedModel

from .managers import ArtistManager


class Artist(TimeStampedModel):

    """Music artist served over the API."""

    name = models.CharField(max_length=100, unique=True)
    objects = ArtistManager()

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


class JamendoArtist(TimeStampedModel):

    """Music artist data stored from the Jamendo API."""

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=250)
    website = models.URLField()
    joindate = models.DateField()
    image = models.URLField()
    shorturl = models.URLField()
    shareurl = models.URLField()

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


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

    class Meta:
        ordering = ('artist',)

    def __str__(self):
        return self.artist


class FMAArtist(TimeStampedModel):

    """Music artist data stored from FreeMusicArchive API."""

    artist_id = models.IntegerField(primary_key=True)
    artist_handle = models.CharField(max_length=250)
    artist_url = models.URLField()
    artist_name = models.CharField(max_length=250)
    artist_bio = models.CharField(max_length=50000, null=True)
    artist_members = models.CharField(max_length=15000, null=True)
    artist_website = models.URLField(null=True)
    artist_wikipedia_page = models.URLField(null=True)
    artist_donation_url = models.URLField(null=True)
    artist_contact = models.CharField(max_length=200, null=True)
    artist_active_year_begin = models.CharField(max_length=4, null=True)
    artist_active_year_end = models.CharField(max_length=4, null=True)
    artist_related_projects = models.CharField(max_length=2000, null=True)
    artist_associated_labels = models.CharField(max_length=500, null=True)
    artist_comments = models.IntegerField()
    artist_favorites = models.IntegerField()
    artist_date_created = models.DateTimeField()
    artist_flattr_name = models.CharField(max_length=100, null=True)
    artist_paypal_name = models.CharField(max_length=100, null=True)
    artist_latitude = models.CharField(max_length=20, null=True)
    artist_longitude = models.CharField(max_length=20, null=True)
    artist_image_file = models.URLField(null=True)
    artist_location = models.CharField(max_length=500, null=True)
    tags = jsonfield.JSONField()
    artist_images = jsonfield.JSONField()

    class Meta:
        ordering = ('artist_name',)

    def __str__(self):
        return self.artist_name
