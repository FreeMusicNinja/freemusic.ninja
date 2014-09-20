from django.conf import settings
from purl import Template
import requests

from .models import SimilarResponse


API_URL = Template("http://developer.echonest.com/api/v4/artist/similar"
                   "?api_key=%s&results=100&name={name}"
                   % settings.ECHONEST_API_KEY)


def get_similar_from_api(name):
    url = API_URL.expand({'name': name})
    r = requests.get(url)
    r.raise_for_status()
    return SimilarResponse.objects.create(name=name, response=r.json())


def get_similar_from_db(name):
    return SimilarResponse.objects.get(normalized_name=name.upper())


def get_similar(name):
    try:
        response = get_similar_from_db(name)
    except SimilarResponse.DoesNotExist:
        response = get_similar_from_api(name)
    return response.artist_names
