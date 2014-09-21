from optparse import make_option

from django.core.management.base import BaseCommand
from artists.importers.fma import fetch_from_fma


class Command(BaseCommand):
    help = "Imports FreeMusicArchive artists from FreeMusicArchive API"
    option_list = BaseCommand.option_list + (
        make_option(
            '--force',
            action='store_true',
            dest='force',
            default=False,
        ),
    )

    def handle(self, **options):
        num_artists = fetch_from_fma(force_update=options['force'])
        self.stdout.write("Imported {} artists".format(num_artists))
