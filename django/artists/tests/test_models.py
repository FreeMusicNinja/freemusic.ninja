import datetime

from unittest import TestCase

from .. import models


class ArtistModelTest(TestCase):

    """Tests for Artist model."""

    def test_str(self):
        name = "Brad Sucks"
        artist = models.Artist(name=name)
        assert str(artist) == name


class HyperlinkModelTest(TestCase):

    """Tests for Hyperlink model."""

    def test_str(self):
        url = "http://example.com"
        link = models.Hyperlink(order=1, name="Jamendo", url=url)
        assert str(link) == url


class JamendoArtist(TestCase):

    """Tests for Jamendo artist model."""

    def setUp(self):
        self.name = "Brad Sucks"
        self.url = "http://www.jamendo.com/artist/1333"
        self.artist = models.JamendoArtist(
            id=1333,
            name=self.name,
            image="https://imgjam.com/artists/b/bradsucks.jpg",
            shorturl="http://jamen.do/a/1333",
            joindate=datetime.date(2006, 2, 27),
            shareurl=self.url,
            website="http://www.bradsucks.net/"
        )

    def test_str(self):
        assert str(self.artist) == self.name

    def test_name(self):
        assert self.artist.name == self.name

    def test_url(self):
        assert self.artist.url == self.url


class MagnatuneArtist(TestCase):

    """Tests for Magnatune artist model."""

    def setUp(self):
        self.name = "Brad Sucks"
        self.url = "http://magnatune.com/artists/brad_sucks/"
        self.artist = models.MagnatuneArtist(
            id=685,
            artist=self.name,
            homepage='brad_sucks',
            description='brilliantly sardonic indie rock',
            bio="One of Magnatune's best selling artists.",
            bandphoto='/artists/img/brad_sucks2.jpg',
            city='',
            state='Ontario',
            country='Canada',
        )

    def test_str(self):
        assert str(self.artist) == self.name

    def test_name(self):
        assert self.artist.name == self.name

    def test_url(self):
        assert self.artist.url == self.url


class FMAArtist(TestCase):

    """Tests for FreeMusicArchive artist model."""

    def setUp(self):
        self.name = "Brad Sucks"
        self.url = "http://freemusicarchive.org/music/Brad_Sucks/"
        self.artist = models.FMAArtist(
            artist_id=3227,
            artist_name=self.name,
            artist_handle="Brad_Sucks",
            artist_bio="Brad Turcotte is a musician from Ottawa.",
            artist_comments=0,
            artist_date_created=datetime.datetime(2009, 5, 5, 7, 25, 25),
            artist_donation_url="http://www.bradsucks.net/tips/",
            artist_favorites=20,
            artist_image_file="http://freemusicarchive.org/file/images/"
                              "artists/Brad_Sucks_-_20110330163911796.jpg",
            artist_url=self.url,
            artist_website="http://www.bradsucks.net/",
            tags=["brad sucks"],
        )

    def test_str(self):
        assert str(self.artist) == self.name

    def test_name(self):
        assert self.artist.name == self.name

    def test_url(self):
        assert self.artist.url == self.url
