from unittest import TestCase

from ..models import User
from ..serializers import AuthenticatedUserSerializer, UserSerializer


class AuthenticatedUserSerializerTest(TestCase):

    """Tests for authenticated user serializer."""

    def test_valid_fields(self):
        id_ = 4
        name = "User"
        email = "user@example.com"
        user = User(id=id_, name=name, email=email)
        serializer = AuthenticatedUserSerializer(user)
        self.assertEqual(serializer.data, {
            'id': 4,
            'name': name,
            'email': email,
        })


class UserSerializerTest(TestCase):

    """Tests for authenticated user serializer."""

    def test_valid_fields(self):
        id_ = 4
        name = "User"
        email = "user@example.com"
        user = User(id=id_, name=name, email=email)
        serializer = UserSerializer(user)
        self.assertEqual(serializer.data, {
            'id': 4,
            'name': name,
        })
