# Generated by Django 3.2.18 on 2023-05-23 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('podcasts', '0006_podcastepisode_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='podcastepisode',
            name='type',
            field=models.CharField(blank=True, default='podcast_episode', max_length=100),
        ),
    ]
