# Generated by Django 3.2.18 on 2023-05-23 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playlists', '0004_playlists_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='playlists',
            name='type',
            field=models.CharField(blank=True, default='playlist', max_length=100),
        ),
    ]
