from unittest import TestCase
from django.test import TestCase as DjangoTestCase

from mock import patch, call
import pytest

from artists.models import Artist
from echonest.models import SimilarResponse
from users.models import User
from ..models import GeneralArtist, Similarity, UserSimilarity
from .. import utils


class HasSimilaritiesAlreadyTest(DjangoTestCase):

    """Tests for has_similarities."""

    def test_with_similarities(self):
        name = "Brad Sucks"
        normalized_name = name.upper()
        artist = GeneralArtist(name=name, normalized_name=normalized_name)
        SimilarResponse.objects.create(name=name)
        assert utils.has_similarities(artist)

    def test_without_similarities(self):
        name = "Brad Sucks"
        normalized_name = name.upper()
        artist = GeneralArtist(name=name, normalized_name=normalized_name)
        SimilarResponse.objects.create(name="Cletus Got Shot")
        assert not utils.has_similarities(artist)


class MakeSimilarityTest(DjangoTestCase):

    """Tests for make_similarity."""

    def test_similarity_exists(self):
        name = "Brad Sucks"
        user = User.objects.get(email='echonest')
        other_artist = GeneralArtist.objects.create(name=name)
        cc_artist = Artist.objects.create(name=name)
        similarity = utils.make_similarity(user, other_artist, cc_artist)
        user_similarity = UserSimilarity.objects.get()
        assert similarity.other_artist == other_artist
        assert similarity.cc_artist == cc_artist
        assert similarity.weight == 5
        assert user_similarity.other_artist == other_artist
        assert user_similarity.cc_artist == cc_artist
        assert user_similarity.weight == 1
        assert user_similarity.user == user
        assert similarity == Similarity.objects.get()

    def test_no_similarity_exists(self):
        user = User.objects.get(email='echonest')
        other_artist = GeneralArtist.objects.create(name="Spoon")
        cc_artist = Artist.objects.create(name="Brad Sucks")
        similarity = utils.make_similarity(user, other_artist, cc_artist)
        user_similarity = UserSimilarity.objects.get()
        assert similarity.other_artist == other_artist
        assert similarity.cc_artist == cc_artist
        assert similarity.weight == 0
        assert user_similarity.other_artist == other_artist
        assert user_similarity.cc_artist == cc_artist
        assert user_similarity.weight == 1
        assert user_similarity.user == user
        assert similarity == Similarity.objects.get(other_artist=other_artist)


@pytest.mark.django_db
class GetSimilarTest(DjangoTestCase):

    """Tests for get_similar."""

    name = "Brad Sucks"

    def setUp(self):
        self.has_similarities_patch = patch('similarities.utils.'
                                            'has_similarities')
        self.has_similarities = self.has_similarities_patch.start()
        self.add_new_similarities_patch = patch('similarities.utils.'
                                                'add_new_similarities')
        self.add_new_similarities = self.add_new_similarities_patch.start()
        self.cc_artist = Artist.objects.create(name=self.name)

    def tearDown(self):
        self.add_new_similarities_patch.stop()
        self.has_similarities_patch.stop()

    def test_cc_artist(self):
        """Test similarity between CC artist and self."""
        artists = utils.get_similar(self.name)
        self.assertSequenceEqual(artists, [self.cc_artist])

    def test_zero_weight(self):
        name = "Tom Waits"
        other_artist = GeneralArtist.objects.create(name=name)
        Similarity.objects.create(
            other_artist=other_artist,
            cc_artist=self.cc_artist,
            weight=0,
        )
        artists = utils.get_similar(name)
        self.assertSequenceEqual(artists, [])

    def test_no_similarity(self):
        name = "Tom Waits"
        GeneralArtist.objects.create(name=name)
        artists = utils.get_similar(name)
        self.assertSequenceEqual(artists, [])

    def test_weight_order(self):
        name = "Soul Coughing"
        cc_artist2 = Artist.objects.create(name="Mike Doughty")
        other_artist = GeneralArtist.objects.create(name=name)
        Similarity.objects.create(
            other_artist=other_artist,
            cc_artist=self.cc_artist,
            weight=2,
        )
        Similarity.objects.create(
            other_artist=other_artist,
            cc_artist=cc_artist2,
            weight=4,
        )
        artists = utils.get_similar("Soul Coughing")
        self.assertSequenceEqual(artists, [cc_artist2, self.cc_artist])

    def test_similarities_already(self):
        """Test add_new_similarities called if has_similarities is True."""
        self.has_similarities.return_value = True
        general_artist = GeneralArtist.objects.get()
        utils.get_similar(self.name)
        self.has_similarities.assert_called_once_with(general_artist)
        assert len(self.add_new_similarities.mock_calls) == 0

    def test_no_similarities_yet(self):
        """Test add_new_similarities not called if has_similarities is False."""
        self.has_similarities.return_value = False
        general_artist = GeneralArtist.objects.get()
        utils.get_similar(self.name)
        self.has_similarities.assert_called_once_with(general_artist)
        self.add_new_similarities.assert_called_once_with(general_artist)


@pytest.mark.django_db
class AddNewSimilaritiesTest(TestCase):

    """Tests for add_new_similarities."""

    def setUp(self):
        module = 'similarities.utils.'
        self.echonest_patch = patch(module + 'echonest')
        self.echonest = self.echonest_patch.start()
        self.update_similarities_patch = patch(module + 'update_similarities')
        self.update_similarities = self.update_similarities_patch.start()
        self.make_similarity_patch = patch(module + 'make_similarity')
        self.make_similarity = self.make_similarity_patch.start()

    def tearDown(self):
        self.echonest_patch.stop()
        self.update_similarities_patch.stop()
        self.make_similarity_patch.stop()

    def test_no_artists(self):
        artist = GeneralArtist(name="Brad Sucks", normalized_name="BRAD SUCKS")
        self.echonest.get_similar.return_value = []
        utils.add_new_similarities(artist)
        self.echonest.get_similar.assert_called_once_with(artist.name)
        assert len(self.update_similarities.mock_calls) == 1
        args = list(self.update_similarities.call_args[0][0])
        assert args == []
        assert len(self.make_similarity.mock_calls) == 0

    def test_two_artists(self):
        names = ["Brad Sucks", "Heifervescent"]
        user = User.objects.get()
        artist = GeneralArtist(name="Brad Sucks", normalized_name="BRAD SUCKS")
        artists = [Artist.objects.create(name=n) for n in names]
        self.make_similarity.side_effect = lambda a, b, c: c
        self.echonest.get_similar.return_value = names
        utils.add_new_similarities(artist)
        self.echonest.get_similar.assert_called_once_with(artist.name)
        assert len(self.update_similarities.mock_calls) == 1
        args = list(self.update_similarities.call_args[0][0])
        assert args == artists
        assert (self.make_similarity.mock_calls ==
                [call(user, artist, artists[i]) for i in (0, 1)])
