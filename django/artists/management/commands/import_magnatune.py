from django.core.management.base import BaseCommand, CommandError
from artists.importers.magnatune import import_from_sqlite


class Command(BaseCommand):
    args = '[sqlite db file]'
    help = "Imports Magnatune artists from Magnatune sqlite file"

    def handle(self, sqlite_filename=None, **options):
        if not sqlite_filename:
            raise CommandError("Must provide sqlite database file")
        num_artists = import_from_sqlite(sqlite_filename)
        self.stdout.write("Imported {} artists".format(num_artists))
