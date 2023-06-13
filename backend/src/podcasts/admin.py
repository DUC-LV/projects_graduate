from django.contrib import admin
from .models import PodCastCategory, TopicPodCast, PodCast, PodCastOfTopic, PodCastOfPodCastCategory, PodcastEpisode, \
    PodcastEpisodeOfPodCast, PodcastStreamingUrl


# Register your models here.
@admin.register(PodCastCategory)
class PodCastCategory(admin.ModelAdmin):
    list_display = ["name", "title", "thumbnail", "created_at"]


admin.register(PodCastCategory)


@admin.register(TopicPodCast)
class TopicPodCast(admin.ModelAdmin):
    list_display = ["title", "created_at"]


admin.register(TopicPodCast)


@admin.register(PodCast)
class PodCast(admin.ModelAdmin):
    list_display = ["title", "thumbnail_m", "thumbnail", "isoffical", "description", "content_type", "type",
                    "created_at"]


admin.register(PodCast)


@admin.register(PodCastOfTopic)
class PodCastOfTopic(admin.ModelAdmin):
    list_display = ["topic", "podcast", "created_at"]


admin.register(PodCastOfTopic)


@admin.register(PodCastOfPodCastCategory)
class PodCastOfPodCastCategory(admin.ModelAdmin):
    list_display = ["podcast_category", "podcast", "created_at"]


admin.register(PodCastOfPodCastCategory)


@admin.register(PodcastEpisode)
class PodcastEpisode(admin.ModelAdmin):
    list_display = ["title", "description", "duration", "thumbnail", "thumbnail_m", "release_date", "content_type",
                    "episode", "created_at"]


admin.register(PodcastEpisode)


@admin.register(PodcastEpisodeOfPodCast)
class PodcastEpisodeOfPodCast(admin.ModelAdmin):
    list_display = ["podcast", "podcast_episode", "created_at"]


@admin.register(PodcastStreamingUrl)
class PodcastStreamingUrl(admin.ModelAdmin):
    list_display = ["quality_64", "quality_128", "quality_320", "podcast_episode", "created_at"]


admin.register(PodcastStreamingUrl)
