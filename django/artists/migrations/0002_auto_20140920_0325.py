# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('artists', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='artist',
            options={'ordering': ('name',)},
        ),
        migrations.AlterModelOptions(
            name='jamendoartist',
            options={'ordering': ('name',)},
        ),
        migrations.AlterModelOptions(
            name='magnatuneartist',
            options={'ordering': ('artist',)},
        ),
    ]
