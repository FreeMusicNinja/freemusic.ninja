# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone
from django.conf import settings
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        ('artists', '0002_auto_20140920_0325'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='GeneralArtist',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('name', models.CharField(unique=True, max_length=100)),
                ('normalized_name', models.CharField(unique=True, max_length=100, editable=False)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Similarity',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('weight', models.IntegerField(choices=[(0, 'dissimilar (these artists are not similar at all)'), (1, "slightly similar (they're not completely different)"), (2, 'fairly similar (some elements of the music sound similar)'), (3, 'very similar (fans of one probably like the other)'), (4, 'extremely similar (easily mistakable)'), (5, 'identical (different name for the same artist)')])),
                ('cc_artist', models.ForeignKey(verbose_name='CC artist', to='artists.Artist')),
                ('other_artist', models.ForeignKey(to='similarities.GeneralArtist')),
            ],
            options={
                'verbose_name_plural': 'similarities',
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='UserSimilarity',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', primary_key=True, serialize=False)),
                ('created', model_utils.fields.AutoCreatedField(editable=False, verbose_name='created', default=django.utils.timezone.now)),
                ('modified', model_utils.fields.AutoLastModifiedField(editable=False, verbose_name='modified', default=django.utils.timezone.now)),
                ('weight', models.IntegerField(choices=[(0, 'dissimilar (these artists are not similar at all)'), (1, "slightly similar (they're not completely different)"), (2, 'fairly similar (some elements of the music sound similar)'), (3, 'very similar (fans of one probably like the other)'), (4, 'extremely similar (easily mistakable)'), (5, 'identical (different name for the same artist)')])),
                ('cc_artist', models.ForeignKey(verbose_name='CC artist', to='artists.Artist')),
                ('other_artist', models.ForeignKey(to='similarities.GeneralArtist')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'user similarities',
            },
            bases=(models.Model,),
        ),
    ]
