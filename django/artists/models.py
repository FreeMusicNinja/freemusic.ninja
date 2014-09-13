from django.db import models
from model_utils.models import TimeStampedModel


class Artist(TimeStampedModel):

    """Music artist served over the API."""

    name = models.CharField(max_length=300, unique=True)
