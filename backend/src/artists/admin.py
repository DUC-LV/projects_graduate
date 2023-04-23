from django.contrib import admin
from .models import Artists, ArtistOfPlaylist


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
