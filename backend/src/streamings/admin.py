from django.contrib import admin
from .models import Streamings


# Register your models here.
@admin.register(Streamings)
class Streamings(admin.ModelAdmin):
    list_display = ["title", "thumbnail", "thumbnail_m", "thumbnail_v", "thumbnail_h", "description", "status", "type",
                    "streaming", "created_at"]


admin.register(Streamings)
