from datetime import datetime

from django.conf import settings
from purl import URL
import requests

from ..models import FMAArtist
from .utils import rate_limited


FIELDS = ['created', 'modified', 'artist_id', 'artist_handle', 'artist_url',
          'artist_name', 'artist_bio', 'artist_members', 'artist_website',
          'artist_wikipedia_page', 'artist_donation_url', 'artist_contact',
          'artist_active_year_begin', 'artist_active_year_end',
          'artist_related_projects', 'artist_associated_labels',
          'artist_comments', 'artist_favorites', 'artist_date_created',
          'artist_flattr_name', 'artist_paypal_name', 'artist_latitude',
          'artist_longitude', 'artist_image_file', 'artist_location',
          'tags', 'artist_images']

API_URL = URL("http://freemusicarchive.org/api/get/artists.json"
              "?sort_by=artist_date_created&sort_dir=desc&limit=200"
              "&api_key={}".format(settings.FMA_API_KEY))


def format_date(date_str):
    if len(date_str) <= 11:
        date_str = "{date} {time}".format(
            date=datetime.utcnow().strftime('%m/%d/%Y'),
            time=date_str,
        )
    return datetime.utcnow().strptime(
        date_str,
        '%m/%d/%Y %H:%M:%S %p',
    )


@rate_limited(4)
def find_on_fma(page):
    """Return artist URL for FreeMusicArchive.org"""
    url = API_URL.query_param('page', page)
    r = requests.get(url)
    r.raise_for_status()
    return r.json()


def fetch_from_fma(force_update=False):
    """Fetch new artists from FreeMusicArchive.org."""
    page = 1
    count = 0
    while True:
        results = find_on_fma(page)
        for artist_data in results['dataset']:
            artist_data['artist_date_created'] = format_date(
                artist_data['artist_date_created'])
            artist, created = FMAArtist.objects.get_or_create(
                artist_id=artist_data['artist_id'],
                defaults={f: v for (f, v) in artist_data.items() if f in FIELDS}
            )
            count += 1
            if not created and not force_update:
                break  # Found duplicate artist
        if results['dataset']:
            print("Imported up to", results['dataset'][-1]['artist_name'])
        count += len(results['dataset'])
        if results['total_pages'] == page or (not force_update and not created):
            break  # Found duplicate artist or reached last page
        page += 1
    return count
