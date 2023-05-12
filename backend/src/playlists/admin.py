from django.contrib import admin
from .models import TopicPlaylist, Playlists, PlaylistOfTopic, TopicPlaylistOfHub


# Register your models here.
@admin.register(TopicPlaylist)
class TopicPlaylist(admin.ModelAdmin):
    list_display = ["title", "created_at"]


admin.register(TopicPlaylist)


@admin.register(Playlists)
class Playlists(admin.ModelAdmin):
    list_display = ["title", "thumbnail", "isoffical", "is_indie", "release_date", "sort_description", "released_at",
                    "pr", "artist_names", "play_item_mode", "sub_type", "thumbnail_m", "is_shuffle", "is_private",
                    "user_name", "is_album", "text_type", "is_single", "created_at"]


admin.register(Playlists)


@admin.register(PlaylistOfTopic)
class PlaylistOfTopic(admin.ModelAdmin):
    list_display = ["topic", "playlist", "created_at"]


admin.register(PlaylistOfTopic)


@admin.register(TopicPlaylistOfHub)
class TopicPlaylistOfHub(admin.ModelAdmin):
    list_display = ["topic_playlist", "hub", "created_at"]


admin.register(TopicPlaylistOfHub)
