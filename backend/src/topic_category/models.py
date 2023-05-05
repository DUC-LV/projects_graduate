from django.db import models
from commons.models import BaseModel


# Create your models here.
class TopicHub(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=100, default=None, blank=True)

    def __str__(self):
        return self.title


class Hub(BaseModel):
    class Meta:
        ordering = ['created_at']

    cover = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)
    thumbnail_has_text = models.CharField(max_length=400, default=None, blank=True)
    thumbnail_r = models.CharField(max_length=400, default=None, blank=True)
    title = models.CharField(max_length=200, default=None, blank=True)
    description = models.TextField(default=None, blank=True)

    def __str__(self):
        return self.title


class HubOfTopic(BaseModel):
    class Meta:
        ordering = ['created_at']

    topic = models.ForeignKey(TopicHub, on_delete=models.CASCADE)
    hub = models.ForeignKey(Hub, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.topic.title}_{self.hub.title}"
