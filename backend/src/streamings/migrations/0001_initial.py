# Generated by Django 3.2.18 on 2023-05-01 08:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Streamings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(blank=True, default=None, max_length=200)),
                ('thumbnail', models.CharField(blank=True, default=None, max_length=400)),
                ('thumbnail_m', models.CharField(blank=True, default=None, max_length=400)),
                ('thumbnail_v', models.CharField(blank=True, default=None, max_length=400)),
                ('thumbnail_h', models.CharField(blank=True, default=None, max_length=400)),
                ('description', models.TextField(blank=True, default=None)),
                ('status', models.IntegerField(blank=True, default=None)),
                ('type', models.CharField(blank=True, default=None, max_length=100)),
                ('streaming', models.CharField(blank=True, default=None, max_length=400)),
            ],
            options={
                'ordering': ['created_at'],
            },
        ),
    ]
