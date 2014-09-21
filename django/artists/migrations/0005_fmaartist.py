# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import jsonfield.fields
import model_utils.fields
import django.utils.timezone
import builtins


class Migration(migrations.Migration):

    dependencies = [
        ('artists', '0004_auto_20140921_1913'),
    ]

    operations = [
        migrations.CreateModel(
            name='FMAArtist',
            fields=[
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('artist_id', models.IntegerField(primary_key=True, serialize=False)),
                ('artist_handle', models.CharField(max_length=250)),
                ('artist_url', models.URLField()),
                ('artist_name', models.CharField(max_length=250)),
                ('artist_bio', models.CharField(null=True, max_length=50000)),
                ('artist_members', models.CharField(null=True, max_length=15000)),
                ('artist_website', models.URLField(null=True)),
                ('artist_wikipedia_page', models.URLField(null=True)),
                ('artist_donation_url', models.URLField(null=True)),
                ('artist_contact', models.CharField(null=True, max_length=200)),
                ('artist_active_year_begin', models.CharField(null=True, max_length=4)),
                ('artist_active_year_end', models.CharField(null=True, max_length=4)),
                ('artist_related_projects', models.CharField(null=True, max_length=2000)),
                ('artist_associated_labels', models.CharField(null=True, max_length=500)),
                ('artist_comments', models.IntegerField()),
                ('artist_favorites', models.IntegerField()),
                ('artist_date_created', models.DateTimeField()),
                ('artist_flattr_name', models.CharField(null=True, max_length=100)),
                ('artist_paypal_name', models.CharField(null=True, max_length=100)),
                ('artist_latitude', models.CharField(null=True, max_length=20)),
                ('artist_longitude', models.CharField(null=True, max_length=20)),
                ('artist_image_file', models.URLField(null=True)),
                ('artist_location', models.CharField(null=True, max_length=500)),
                ('tags', jsonfield.fields.JSONField(default=builtins.dict)),
                ('artist_images', jsonfield.fields.JSONField(default=builtins.dict)),
            ],
            options={
                'ordering': ('artist_name',),
            },
            bases=(models.Model,),
        ),
    ]
