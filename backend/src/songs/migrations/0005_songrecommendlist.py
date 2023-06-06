# Generated by Django 3.2.18 on 2023-06-06 13:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0004_streamingurlsong'),
    ]

    operations = [
        migrations.CreateModel(
            name='SongRecommendList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('song', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='song', to='songs.songs')),
                ('song_recommend', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='song_recommend', to='songs.songs')),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]
