import sqlite3
from ..models import MagnatuneArtist


FIELDS = ['artist', 'description', 'bio', 'homepage', 'bandphoto', 'city',
          'state', 'country']


def find_missing_artists(conn):
    c = conn.cursor()
    c.execute("SELECT artist from artists")
    sqlite_artists = {r[0] for r in c.fetchall()}
    db_artists = {m.artist for m in
                  MagnatuneArtist.objects.filter(artist__in=sqlite_artists)}
    return sqlite_artists - db_artists


def import_from_sqlite(sqlite_filename):
    """Return artist URL for Magnatune.com"""
    connection = sqlite3.connect(sqlite_filename)
    c = connection.cursor()
    missing_artists = find_missing_artists(connection)
    c.execute("SELECT {} from artists WHERE artist IN ({})"
              .format(','.join(FIELDS), ','.join('?' * len(missing_artists))),
              tuple(missing_artists))
    results = c.fetchall()
    for result in results:
        MagnatuneArtist.objects.create(
            **{f: v for (f, v) in zip(FIELDS, result)})
    return len(results)
