from django.db import models
from django.conf import settings
from model_utils import Choices
from model_utils.models import TimeStampedModel


class GeneralArtist(TimeStampedModel):

    """Any artist that might be searched for."""

    name = models.CharField(max_length=100, unique=True)
    normalized_name = models.CharField(max_length=100, editable=False,
                                       unique=True)

    def clean(self):
        self.normalized_name = self.name.upper()


class BaseSimilarity(TimeStampedModel):

    class Meta:
        abstract = True

    WEIGHTS = Choices(
        (0, "dissimilar (these artists are not similar at all)"),
        (1, "slightly similar (they're not completely different)"),
        (2, "fairly similar (some elements of the music sound similar)"),
        (3, "very similar (fans of one probably like the other)"),
        (4, "extremely similar (easily mistakable)"),
        (5, "identical (different name for the same artist)"),
    )

    cc_artist = models.ForeignKey('artists.Artist', verbose_name="CC artist")
    other_artist = models.ForeignKey(GeneralArtist)
    weight = models.IntegerField(choices=WEIGHTS)


class UserSimilarity(BaseSimilarity):

    """Similarity between two artists as given by an individual user."""

    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    class Meta:
        verbose_name_plural = "user similarities"


class Similarity(BaseSimilarity):

    """Cummulative similarity between two artists."""

    class Meta:
        verbose_name_plural = "similarities"
