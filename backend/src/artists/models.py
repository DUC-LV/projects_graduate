from django.db import models
from commons.models import BaseModel
from playlists.models import Playlists
from albums.models import Albums
from songs.models import Songs
from video.models import Videos


# Create your models here.
class Artists(BaseModel):
    class Meta:
        ordering = ['created_at']

    name = models.CharField(max_length=100, default=None, blank=True, null=True)
    spotlight = models.BooleanField(default=False)
    alias = models.CharField(max_length=100, default=None, blank=True, null=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True, null=True)
    thumbnail_m = models.CharField(max_length=400, default=None, blank=True, null=True)
    is_oa = models.BooleanField(default=True)
    is_oa_brand = models.BooleanField(default=False)
    total_follow = models.IntegerField(default=None, blank=True, null=True)

    def __str__(self):
        return self.name


class ArtistOfPlaylist(BaseModel):
    class Meta:
        ordering = ['created_at']

    playlist = models.ForeignKey(Playlists, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artists, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.playlist.title}_{self.artist.name}"


class ArtistOfAlbum(BaseModel):
    class Meta:
        ordering = ['created_at']

    album = models.ForeignKey(Albums, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artists, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.album.title}_{self.artist.name}"


class ArtistOfSong(BaseModel):
    class Meta:
        ordering = ['created_at']

    song = models.ForeignKey(Songs, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artists, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.song.title}_{self.artist.name}"


class ArtistOfVideos(BaseModel):
    class Meta:
        ordering = ['created_at']

    video = models.ForeignKey(Videos, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artists, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.video.title}_{self.artist.name}"
