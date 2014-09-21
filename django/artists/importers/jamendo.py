import datetime

from django.conf import settings
from django.db import models
from purl import URL
import requests

from .utils import rate_limited
from ..models import JamendoArtist


FIELDS = ['created', 'modified', 'id', 'name', 'website', 'joindate', 'image',
          'shorturl', 'shareurl']
API_URL = URL("http://api.jamendo.com/v3.0/artists"
              "?client_id=%s&limit=200&order=joindate"
              % settings.JAMENDO_CLIENT_ID)


@rate_limited(2)
def find_artists_after(date, offset):
    url = API_URL.query_param('offset', offset)
    if date:
        url = url.query_param('datebetween',
                              "{}_{}".format(date, datetime.date.today()))
    r = requests.get(url)
    r.raise_for_status()
    return r.json()['results']


def fetch_from_jamendo():
    """Fetch new artists from Jamendo."""
    qs = JamendoArtist.objects.aggregate(models.Max('joindate'))
    date = qs['joindate__max']
    offset = 0
    while True:
        results = find_artists_after(date, offset)
        for artist_data in results:
            JamendoArtist.objects.get_or_create(
                **{f: v for (f, v) in artist_data.items() if f in FIELDS})
        if results:
            print("Imported up to", results[-1]['name'])
        offset += len(results)
        if len(results) < 200:
            break
    return offset
