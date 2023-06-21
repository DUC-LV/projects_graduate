from django.db import models
from commons.models import BaseModel


# Create your models here.
class Packages(BaseModel):
    class Meta:
        ordering = ['created_at']

    package_name = models.CharField(max_length=200, default=None, blank=True)
    price = models.CharField(max_length=200, default=None, blank=True)
    promotion = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)

    def __str__(self):
        return self.package_name
