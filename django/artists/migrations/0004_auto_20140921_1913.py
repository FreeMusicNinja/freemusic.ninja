# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('artists', '0003_auto_20140921_1858'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jamendoartist',
            name='name',
            field=models.CharField(max_length=250),
        ),
    ]
