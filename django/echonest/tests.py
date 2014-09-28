import json
from unittest import TestCase

from mock import patch

from .models import SimilarResponse


class SimilarResponseModelTest(TestCase):

    """Tests for SimilarResponse model."""

    def test_save(self):
        name = "Brad Sucks"
        similar_response = SimilarResponse(name=name)
        with patch('echonest.models.SimilarResponse.save_base') as save_base:
            self.assertEqual(similar_response.normalized_name, "")
            similar_response.save()
            save_base.assert_called_once_with(
                update_fields=None,
                using='default',
                force_update=False,
                force_insert=False,
            )
            self.assertEqual(similar_response.normalized_name, name.upper())

    def test_artist_names(self):
        response = {'response': {'artists': [{'name': "Brad Sucks"}]}}
        similar_response = SimilarResponse(response=json.dumps(response))
        self.assertEqual(similar_response.artist_names, ["Brad Sucks"])
