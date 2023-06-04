from django.contrib import admin
from .models import Songs, SongOfPlaylist, SongOfAlbum, StreamingUrlSong


# Register your models here.
@admin.register(Songs)
class Songs(admin.ModelAdmin):
    list_display = ["title", "alias", "is_offical", "user_name", "artist_names", "is_world_wide", "thumbnail_m",
                    "thumbnail", "duration", "zing_choice", "is_private", "pre_release", "release_date", "is_indie",
                    "streaming_status", "allow_audio_ads", "has_lyric", "type", "created_at"]


admin.register(Songs)


@admin.register(SongOfPlaylist)
class SongOfPlaylist(admin.ModelAdmin):
    list_display = ["playlist", "song", "created_at"]


admin.register(SongOfPlaylist)


@admin.register(SongOfAlbum)
class SongOfAlbum(admin.ModelAdmin):
    list_display = ["album", "song", "created_at"]


admin.register(SongOfAlbum)


@admin.register(StreamingUrlSong)
class StreamingUrlSong(admin.ModelAdmin):
    list_display = ["quality_128", "quality_320", "song"]


admin.register(StreamingUrlSong)

