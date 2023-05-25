from django.db import models
from commons.models import BaseModel
from topic_category.models import Hub
from django.conf import settings


# Create your models here.
class TopicPlaylist(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Playlists(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)
    isoffical = models.BooleanField(default=True)
    is_indie = models.BooleanField(default=False)
    release_date = models.CharField(max_length=100, default=None, blank=True, null=True)
    sort_description = models.TextField(default=None, blank=True)
    released_at = models.IntegerField(default=None, blank=True, null=True)
    pr = models.BooleanField(default=False)
    artist_names = models.CharField(max_length=100, default=None, blank=True)
    play_item_mode = models.IntegerField(default=0)
    sub_type = models.IntegerField(default=1)
    uid = models.IntegerField(default=None, blank=True, null=True)
    thumbnail_m = models.CharField(max_length=400, default=None, blank=True)
    is_shuffle = models.BooleanField(default=True)
    is_private = models.BooleanField(default=False)
    user_name = models.CharField(max_length=100, default="My Music")
    is_album = models.BooleanField(default=False)
    text_type = models.CharField(max_length=100, default="Playlist")
    is_single = models.BooleanField(default=False)
    type = models.CharField(max_length=100, default='playlist', blank=True)
    follow = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='follow_playlist')

    def __str__(self):
        return self.title


class PlaylistOfTopic(BaseModel):
    class Meta:
        ordering = ['created_at']

    topic = models.ForeignKey(TopicPlaylist, on_delete=models.CASCADE)
    playlist = models.ForeignKey(Playlists, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.topic.title}_{self.playlist.title}"


class TopicPlaylistOfHub(BaseModel):
    class Meta:
        ordering = ['created_at']

    hub = models.ForeignKey(Hub, on_delete=models.CASCADE)
    topic_playlist = models.ForeignKey(TopicPlaylist, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.hub.title}_{self.topic_playlist.title}"
