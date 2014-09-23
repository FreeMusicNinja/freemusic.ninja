# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('artists', '0006_hyperlink'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hyperlink',
            name='name',
            field=models.CharField(max_length=50, choices=[('bandcamp', 'Bandcamp'), ('jamendo', 'Jamendo'), ('magnatune', 'Magnatune'), ('fma', 'Free Music Archive'), ('homepage', 'Homepage')]),
        ),
    ]
