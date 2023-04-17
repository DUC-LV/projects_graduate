from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


# Create your models here.
class AuthUser(AbstractBaseUser, PermissionsMixin):
    class Meta:
        ordering = ['created_at']

    email = models.CharField(max_length=200, default=None, blank=True)
    user_name = models.CharField(max_length=150, default=None, blank=True)
    first_name = models.CharField(max_length=150, default=None, blank=True)
    last_name = models.CharField(max_length=150, default=None, blank=True)
    is_active = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'first_name']

    def __str__(self):
        return self.user_name
