from django.core.management.base import BaseCommand

from artists.importers import fetch_from_jamendo


class Command(BaseCommand):
    help = "Imports Jamendo artists from Jamendo API"

    def handle(self, **options):
        num_artists = fetch_from_jamendo()
        self.stdout.write("Imported {} artists".format(num_artists))
