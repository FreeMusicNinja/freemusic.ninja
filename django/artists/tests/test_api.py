import json
from unittest.mock import patch

from django.core.urlresolvers import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from artists.models import Artist
from echonest.models import SimilarResponse


class ArtistTest(APITestCase):

    @patch('echonest.utils.get_similar_from_api')
    def test_find_artists(self, get_similar):
        url = reverse('artist-list')
        names = ["Mike Doughty", "Jonathan Coulton"]
        response = {
            'response': {
                'status': {
                    'message': 'Success',
                    'version': '4.2',
                    'code': 0,
                },
                'artists': [
                    {'id': 'ARHE4MO1187FB4014D', 'name': 'Mike Doughty'},
                    {'id': 'ARW7K0P1187B9B5B47', 'name': 'Barenaked Ladies'},
                    {'id': 'ARXSNCN1187B9B06A3', 'name': 'Jonathan Coulton'}
                ],
            },
        }
        artists = [Artist.objects.create(name=n) for n in names]
        get_similar.return_value = SimilarResponse(
            name="They Might Be Giants",
            response=json.dumps(response),
        )
        data = {'name': "They Might Be Giants"}
        response = self.client.get(url, data, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert (response.data == [
            {'id': a.id, 'name': a.name, 'links': list(a.links.all())}
            for a in artists
        ])

    def test_get_artist(self):
        artist = Artist.objects.create(name="Brad Sucks")
        url = reverse('artist-detail', args=[artist.id])
        response = self.client.get(url, format='json')
        assert response.status_code == status.HTTP_200_OK
        assert (response.data == {
            'id': artist.id,
            'name': artist.name,
            'links': list(artist.links.all()),
        })
