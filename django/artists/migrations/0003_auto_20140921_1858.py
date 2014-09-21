# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('artists', '0002_auto_20140920_0325'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jamendoartist',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]
