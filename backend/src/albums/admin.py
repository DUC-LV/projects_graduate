from django.contrib import admin
from .models import TopicAlbum, Albums, AlbumOfTopic


# Register your models here.
@admin.register(TopicAlbum)
class TopicAlbum(admin.ModelAdmin):
    list_display = ["title", "created_at"]


admin.register(TopicAlbum)


@admin.register(Albums)
class Albums(admin.ModelAdmin):
    list_display = ["title", "thumbnail", "is_offical", "is_indie", "release_date", "sort_description", "released_at",
                    "pr", "artist_names", "created_at"]


admin.register(Albums)


@admin.register(AlbumOfTopic)
class AlbumOfTopic(admin.ModelAdmin):
    list_display = ["topic", "album", "created_at"]


admin.register(AlbumOfTopic)
