# Generated by Django 3.2.18 on 2023-05-12 17:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('topic_category', '0001_initial'),
        ('playlists', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TopicPlaylistOfHub',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('hub', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='topic_category.hub')),
                ('topic_playlist', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playlists.topicplaylist')),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]
