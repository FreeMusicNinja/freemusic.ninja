import os
from tempfile import NamedTemporaryFile

from django.core.management.base import BaseCommand
import requests

from artists import importers
from artists.models import (Artist, FMAArtist, JamendoArtist, MagnatuneArtist,
                            Hyperlink)


def get_sqlite_file():
    temp_file = NamedTemporaryFile(delete=False)
    r = requests.get('http://he3.magnatune.com/info/sqlite_magnatune.db',
                     stream=True)
    with open(temp_file.name, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk:
                f.write(chunk)
                f.flush()
    return temp_file.name


def update_urls(name, model, order):
    for a in model.objects.all():
        if len(a.name) > 100:
            continue
        artist, created = Artist.objects.get_or_create(name=a.name)
        if not artist.links.filter(name=a.url).exists():
            Hyperlink.objects.get_or_create(
                artist=artist,
                name=name,
                defaults={'order': order, 'url': a.url},
            )


class Command(BaseCommand):
    help = "Updates artist info from Magnatune, FreeMusicArchive, Jamendo."""

    def handle(self, **options):
        print("Fetching from Magnatune")
        sqlite_filename = get_sqlite_file()
        num_artists = importers.import_from_sqlite(sqlite_filename)
        os.remove(sqlite_filename)
        print("Fetching from FreeMusicArchive")
        num_artists += importers.fetch_from_fma()
        print("Fetching from Jamendo")
        num_artists += importers.fetch_from_jamendo()
        update_urls('jamendo', JamendoArtist, order=20)
        update_urls('magnatune', MagnatuneArtist, order=30)
        update_urls('fma', FMAArtist, order=40)
        self.stdout.write("Imported {} artists".format(num_artists))
