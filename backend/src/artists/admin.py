from django.contrib import admin
from .models import Artists, ArtistOfPlaylist, ArtistOfAlbum, ArtistOfSong


# Register your models here.
@admin.register(Artists)
class Artists(admin.ModelAdmin):
    list_display = ["name", "spotlight", "alias", "thumbnail", "thumbnail_m", "is_oa", "is_oa_brand", "total_follow",
                    "created_at"]


admin.register(Artists)


@admin.register(ArtistOfPlaylist)
class ArtistOfPlaylist(admin.ModelAdmin):
    list_display = ["playlist", "artist", "created_at"]


admin.register(ArtistOfPlaylist)


@admin.register(ArtistOfAlbum)
class ArtistOfAlbum(admin.ModelAdmin):
    list_display = ["album", "artist", "created_at"]


admin.register(ArtistOfAlbum)


@admin.register(ArtistOfSong)
class ArtistOfSong(admin.ModelAdmin):
    list_display = ["song", "artist", "created_at"]


admin.register(ArtistOfSong)


# @admin.register(ArtistOfVideo)
# class ArtistOfVideo(admin.ModelAdmin):
#     list_display = ["video", "artist", "created_at"]
#
#
# admin.register(ArtistOfVideo)

