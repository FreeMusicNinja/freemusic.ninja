from unittest import TestCase
from unittest.mock import patch

from django.test import TestCase as DjangoTestCase
from rest_framework.authtoken.models import Token
import pytest

from .. import models


class UserModelTet(TestCase):

    """Tests for User model."""

    def test_save_with_name(self):
        name = "My Name"
        user = models.User(name=name)
        with patch('users.models.User.save_base') as save_base:
            self.assertEqual(user.name, name)
            user.save()
            save_base.assert_called_once_with(
                update_fields=None,
                using='default',
                force_update=False,
                force_insert=False,
            )
            self.assertEqual(user.name, name)

    def test_save_without_name(self):
        user = models.User()
        with patch('users.models.User.save_base') as save_base:
            self.assertEqual(user.name, "")
            user.save()
            save_base.assert_called_once_with(
                update_fields=None,
                using='default',
                force_update=False,
                force_insert=False,
            )
            self.assertEqual(user.name, "Anonymous")

    def test_get_full_name(self):
        name = "Full Name"
        user = models.User(name=name)
        assert user.get_full_name() == name

    def test_get_short_name(self):
        name = "Full Name"
        user = models.User(name=name)
        assert user.get_short_name() == name

    def test_str(self):
        name = "Full Name"
        user = models.User(name=name)
        assert str(user) == name

    def test_has_perm(self):
        user = models.User()
        assert user.has_perm('users.add_user')

    def test_has_module_perms(self):
        user = models.User()
        assert user.has_module_perms('users')

    def test_is_staff(self):
        assert not models.User().is_staff
        assert models.User(is_admin=True).is_staff


class CreateAuthTokenTest(DjangoTestCase):

    """Tests for User post_save signal."""

    def test_user_created(self):
        user = models.User.objects.create(email='user@example.com')
        self.assertEqual(Token.objects.select_related().get().user, user)

    def test_user_modified(self):
        user = models.User.objects.create(email='user@example.com')
        Token.objects.all().delete()
        user.save()
        self.assertFalse(Token.objects.all().exists())


class UserManagerTest(TestCase):

    """Tests for UserManager."""

    email = "user@example.com"
    password = "password"

    def setUp(self):
        self.manager = models.User.objects
        self.user_model_patch = patch.object(self.manager, 'model')
        self.user_model = self.user_model_patch.start()

    def tearDown(self):
        self.user_model_patch.stop()

    def assertModelInitialized(self, **kwargs):
        self.user_model.assert_called_once_with(**kwargs)

    def test_create_user_return_value(self):
        user = self.manager.create_user(self.email)
        assert user == self.user_model()

    def test_create_user_save_called(self):
        user = self.manager.create_user(self.email)
        assert user == self.user_model()
        self.user_model().save.assert_called_once_with(
            using=self.manager._db)

    def test_create_user_no_email(self):
        with pytest.raises(ValueError):
            self.manager.create_user("")
        assert self.user_model().save.call_count == 0

    def test_create_user_email_only(self):
        self.manager.create_user(self.email)
        self.assertModelInitialized(email=self.email, name="")

    def test_create_user_with_name(self):
        name = "Full Name"
        self.manager.create_user(self.email, name=name)
        self.assertModelInitialized(email=self.email, name=name)

    def test_create_user_with_password(self):
        self.manager.create_user(self.email, password=self.password)
        self.assertModelInitialized(email=self.email, name="")
        self.user_model().set_password.assert_called_once_with(self.password)

    def test_create_superuser(self):
        with patch.object(self.manager, 'create_user') as create_user:
            user = self.manager.create_superuser(self.email, self.password)
        create_user.assert_called_once_with(
            email=self.email,
            name="",
            password=self.password,
        )
        assert user == create_user()

    def test_create_superuser_with_name(self):
        name = "Full Name"
        with patch.object(self.manager, 'create_user') as create_user:
            self.manager.create_superuser(self.email, self.password, name)
        create_user.assert_called_once_with(
            email=self.email,
            name=name,
            password=self.password,
        )
