# Generated by Django 3.2.18 on 2023-06-14 13:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('video', '0001_initial'),
        ('artists', '0005_artistofvideo'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ArtistOfVideo',
            new_name='ArtistOfVideos',
        ),
    ]
