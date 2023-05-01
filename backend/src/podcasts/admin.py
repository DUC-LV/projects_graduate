from django.contrib import admin
from .models import PodCastCategory


# Register your models here.
@admin.register(PodCastCategory)
class PodCastCategory(admin.ModelAdmin):
    list_display = ["name", "title", "thumbnail", "created_at"]


admin.register(PodCastCategory)
