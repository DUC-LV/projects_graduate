# Generated by Django 3.2.18 on 2023-05-23 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='songs',
            name='type',
            field=models.CharField(blank=True, default='song', max_length=100),
        ),
    ]
