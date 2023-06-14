from django.db import models
from commons.models import BaseModel


# Create your models here.
class TopicVideo(BaseModel):
    class Meta:
        ordering = ['created_at']

    name = models.CharField(max_length=200, default=None, blank=True)
    title = models.CharField(max_length=200, default=None, blank=True)
    alias = models.CharField(max_length=200, default=None, blank=True)

    def __str__(self):
        return self.title


class Videos(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)
    duration = models.CharField(max_length=100, default=None, blank=True)
    type = models.CharField(max_length=100, default="VIDEO", blank=True)
    date_release = models.IntegerField(default=None, blank=True)
    date_create = models.IntegerField(default=None, blank=True)

    def __str__(self):
        return self.title


class VideoOfTopic(BaseModel):
    class Meta:
        ordering = ['created_at']

    topic = models.ForeignKey(TopicVideo, on_delete=models.CASCADE)
    video = models.ForeignKey(Videos, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.topic.title}_{self.video.title}"
