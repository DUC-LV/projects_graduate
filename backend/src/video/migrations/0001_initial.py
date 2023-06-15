# Generated by Django 3.2.18 on 2023-06-14 12:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TopicVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(blank=True, default=None, max_length=200)),
                ('title', models.CharField(blank=True, default=None, max_length=200)),
                ('alias', models.CharField(blank=True, default=None, max_length=200)),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
        migrations.CreateModel(
            name='Videos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(blank=True, default=None, max_length=200)),
                ('thumbnail', models.CharField(blank=True, default=None, max_length=400)),
                ('duration', models.CharField(blank=True, default=None, max_length=100)),
                ('type', models.CharField(blank=True, default='VIDEO', max_length=100)),
                ('date_release', models.IntegerField(blank=True, default=None)),
                ('date_create', models.IntegerField(blank=True, default=None)),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
        migrations.CreateModel(
            name='VideoOfTopic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='video.topicvideo')),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='video.videos')),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]