from django.db import models
from commons.models import BaseModel
from playlists.models import Playlists
from albums.models import Albums


# Create your models here.
class Songs(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)
    alias = models.CharField(max_length=200, default=None, blank=True)
    is_offical = models.BooleanField(default=True, blank=True)
    user_name = models.CharField(max_length=100, default=None, blank=True)
    artist_names = models.CharField(max_length=100, default=None, blank=True)
    is_world_wide = models.BooleanField(default=True, blank=True)
    thumbnail_m = models.CharField(max_length=400, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)
    duration = models.IntegerField(default=None, blank=True)
    zing_choice = models.BooleanField(default=False, blank=True)
    is_private = models.BooleanField(default=False, blank=True)
    pre_release = models.BooleanField(default=False, blank=True)
    release_date = models.IntegerField(default=None, blank=True)
    is_indie = models.BooleanField(default=False, blank=True)
    streaming_status = models.IntegerField(default=1, blank=True)
    allow_audio_ads = models.BooleanField(default=True, blank=True)
    has_lyric = models.BooleanField(default=False, blank=True)
    type = models.CharField(max_length=100, default='song', blank=True)

    def __str__(self):
        return self.title


class SongOfPlaylist(BaseModel):
    class Meta:
        ordering = ['created_at']

    playlist = models.ForeignKey(Playlists, on_delete=models.CASCADE)
    song = models.ForeignKey(Songs, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.playlist.title}_{self.song.title}"


class SongOfAlbum(BaseModel):
    class Meta:
        ordering = ['created_at']

    album = models.ForeignKey(Albums, on_delete=models.CASCADE)
    song = models.ForeignKey(Songs, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.album.title}_{self.song.title}"
