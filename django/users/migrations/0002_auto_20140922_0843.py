# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def add_echonest_forward(apps, schema_editor):
    """Create echonest user."""
    User = apps.get_model("users", "User")
    User.objects.update_or_create(email='echonest')


def add_echonest_backward(apps, schema_editor):
    """Delete echonest user."""
    User = apps.get_model("users", "User")
    User.objects.filter(email='echonest').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(add_echonest_forward, add_echonest_backward)
    ]
