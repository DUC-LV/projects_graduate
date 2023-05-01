from django.db import models
from commons.models import BaseModel


# Create your models here.
class PodCastCategory(BaseModel):
    class Meta:
        ordering = ['created_at']

    name = models.CharField(max_length=200, default=None, blank=True)
    title = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)

    def __str__(self):
        return self.name
