from django.db import models
from commons.models import BaseModel


# Create your models here.
class TopicAlbum(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Albums(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=300, default=None, blank=True)
    is_offical = models.BooleanField(default=True, blank=True)
    is_indie = models.BooleanField(default=False, blank=True)
    release_date = models.CharField(max_length=100, default=None, blank=True)
    sort_description = models.TextField(default=None, blank=True)
    released_at = models.IntegerField(default=None, blank=True)
    pr = models.BooleanField(default=False, blank=True)
    artist_names = models.CharField(max_length=100, default=None, blank=True)

    def __str__(self):
        return self.title


class AlbumOfTopic(BaseModel):
    class Meta:
        ordering = ['created_at']

    topic = models.ForeignKey(TopicAlbum, on_delete=models.CASCADE)
    album = models.ForeignKey(Albums, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.topic.title}_{self.album.title}"
