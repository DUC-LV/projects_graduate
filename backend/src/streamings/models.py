from django.db import models
from commons.models import BaseModel


# Create your models here.
class Streamings(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)
    thumbnail_m = models.CharField(max_length=400, default=None, blank=True)
    thumbnail_v = models.CharField(max_length=400, default=None, blank=True)
    thumbnail_h = models.CharField(max_length=400, default=None, blank=True)
    description = models.TextField(default=None, blank=True)
    status = models.IntegerField(default=None, blank=True)
    type = models.CharField(max_length=100, default=None, blank=True)
    streaming = models.CharField(max_length=400, default=None, blank=True)

    def __str__(self):
        return self.title
