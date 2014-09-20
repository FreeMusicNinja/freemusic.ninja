# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('artists', '0002_auto_20140920_0325'),
        ('similarities', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='generalartist',
            name='similar_artists',
            field=models.ManyToManyField(through='similarities.Similarity', to='artists.Artist'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='similarity',
            name='weight',
            field=models.IntegerField(choices=[(0, 'dissimilar (these artists are not similar at all)'), (1, "slightly similar (they're not completely different)"), (2, 'fairly similar (some elements of the music sound similar)'), (3, 'very similar (fans of one probably like the other)'), (4, 'extremely similar (easily mistakable)'), (5, 'identical (different name for the same artist)')], default=0),
        ),
        migrations.AlterField(
            model_name='usersimilarity',
            name='weight',
            field=models.IntegerField(choices=[(0, 'dissimilar (these artists are not similar at all)'), (1, "slightly similar (they're not completely different)"), (2, 'fairly similar (some elements of the music sound similar)'), (3, 'very similar (fans of one probably like the other)'), (4, 'extremely similar (easily mistakable)'), (5, 'identical (different name for the same artist)')], default=0),
        ),
        migrations.AlterUniqueTogether(
            name='similarity',
            unique_together=set([('cc_artist', 'other_artist')]),
        ),
        migrations.AlterUniqueTogether(
            name='usersimilarity',
            unique_together=set([('user', 'cc_artist', 'other_artist')]),
        ),
    ]
