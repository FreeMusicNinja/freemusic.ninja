from django.db import models
import jsonfield
from model_utils.models import TimeStampedModel


class SimilarResponse(TimeStampedModel):

    """Response from artists/similar API resource at The Echo Nest."""

    name = models.CharField(max_length=100)
    normalized_name = models.CharField(max_length=100, editable=False,
                                       db_index=True)
    response = jsonfield.JSONField()

    def save(self, **kwargs):
        self.normalized_name = self.name.upper()
        return super().save(**kwargs)

    @property
    def artist_names(self):
        return [a['name'] for a in self.response['response']['artists']]
