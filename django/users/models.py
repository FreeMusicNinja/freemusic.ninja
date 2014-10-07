from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db import models
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class UserManager(BaseUserManager):

    """Model manager for User model."""

    def create_user(self, email, name="", password=None):
        """Creates a user with the given email, name, and password."""
        if not email:
            raise ValueError("Users must have an email address.")
        user = self.model(
            email=self.normalize_email(email),
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, name=""):
        """Creates a superuser with the given email, name, and password."""
        user = self.create_user(
            email=email,
            name=name,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):

    """User of the website."""

    name = models.CharField('display name', max_length=30, blank=True)
    email = models.EmailField('email address', max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def clean(self):
        if not self.name:
            self.name = "Anonymous"

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


@receiver(models.signals.post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    """Create an auth token for newly created users."""
    if created:
        Token.objects.create(user=instance)
