from django.contrib import admin
from .models import TopicHub, Hub, HubOfTopic


# Register your models here.
@admin.register(TopicHub)
class TopicHub(admin.ModelAdmin):
    list_display = ["title", "created_at"]


admin.register(TopicHub)


@admin.register(Hub)
class Hub(admin.ModelAdmin):
    list_display = ["cover", "thumbnail", "thumbnail_has_text", "thumbnail_r", "title", "description", "created_at"]


admin.register(Hub)


@admin.register(HubOfTopic)
class HubOfTopic(admin.ModelAdmin):
    list_display = ["topic", "hub", "created_at"]


admin.register(HubOfTopic)
