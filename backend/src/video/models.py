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


class VideoStreamingUrl(BaseModel):
    class Meta:
        ordering = ['created_at']

    quality_480 = models.CharField(max_length=400, default=None, blank=True)
    quality_720 = models.CharField(max_length=400, default=None, blank=True)
    quality_1080 = models.CharField(max_length=400, default=None, blank=True)

    video = models.ForeignKey(Videos, on_delete=models.CASCADE)

    def __str__(self):
        return self.video.title


class VideoRecommendList(BaseModel):
    class Meta:
        ordering = ['created_at']

    video = models.ForeignKey(Videos, on_delete=models.CASCADE, related_name="video")
    video_recommend = models.ForeignKey(Videos, on_delete=models.CASCADE, related_name="video_recommend")

    def __str__(self):
        return f"{self.video.title}_{self.video_recommend.title}"
