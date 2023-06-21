from django.contrib import admin
from .models import TopicVideo, Videos, VideoOfTopic, VideoStreamingUrl, VideoRecommendList


# Register your models here.
@admin.register(TopicVideo)
class TopicVideo(admin.ModelAdmin):
    list_display = ["name", "title", "alias", "created_at"]


admin.register(TopicVideo)


@admin.register(Videos)
class Videos(admin.ModelAdmin):
    list_display = ["title", "thumbnail", "duration", "type", "date_release", "date_create", "created_at"]


admin.register(Videos)


@admin.register(VideoOfTopic)
class VideoOfTopic(admin.ModelAdmin):
    list_display = ["topic", "video", "created_at"]


admin.register(VideoOfTopic)


@admin.register(VideoStreamingUrl)
class VideoStreamingUrl(admin.ModelAdmin):
    list_display = ["quality_480", "quality_720", "quality_1080", "video", "created_at"]


admin.register(VideoStreamingUrl)


@admin.register(VideoRecommendList)
class VideoRecommendList(admin.ModelAdmin):
    list_display = ["video", "video_recommend", "created_at"]


admin.register(VideoRecommendList)
