# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import model_utils.fields
import jsonfield.fields
import builtins
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SimilarResponse',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('name', models.CharField(max_length=100)),
                ('normalized_name', models.CharField(max_length=100, editable=False, db_index=True)),
                ('response', jsonfield.fields.JSONField(default=builtins.dict)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
    ]
