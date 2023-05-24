from django.db import models
from commons.models import BaseModel
from django.conf import settings


# Create your models here.
class PodCastCategory(BaseModel):
    class Meta:
        ordering = ['created_at']

    name = models.CharField(max_length=200, default=None, blank=True)
    title = models.CharField(max_length=200, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)

    def __str__(self):
        return self.name


class TopicPodCast(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)

    def __str__(self):
        return self.title


class PodCast(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)
    thumbnail_m = models.CharField(max_length=400, default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)
    isoffical = models.BooleanField(default=True)
    description = models.TextField(default=None, blank=True)
    content_type = models.CharField(max_length=200, default=None, blank=True)
    type = models.CharField(max_length=200, default=None, blank=True)

    def __str__(self):
        return self.title


class PodCastOfTopic(BaseModel):
    class Meta:
        ordering = ['created_at']

    topic = models.ForeignKey(TopicPodCast, on_delete=models.CASCADE)
    podcast = models.ForeignKey(PodCast, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.topic.title}_{self.podcast.title}"


class PodCastOfPodCastCategory(BaseModel):
    class Meta:
        ordering = ['created_at']

    podcast_category = models.ForeignKey(PodCastCategory, on_delete=models.CASCADE)
    podcast = models.ForeignKey(PodCast, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.podcast_category.title}_{self.podcast.title}"


class PodcastEpisode(BaseModel):
    class Meta:
        ordering = ['created_at']

    title = models.CharField(max_length=200, default=None, blank=True)
    description = models.TextField(default=None, blank=True)
    duration = models.IntegerField(default=None, blank=True)
    thumbnail = models.CharField(max_length=400, default=None, blank=True)
    thumbnail_m = models.CharField(max_length=400, default=None, blank=True)
    release_date = models.IntegerField(default=None, blank=True)
    content_type = models.CharField(max_length=100, default="episode", blank=True)
    episode = models.BooleanField(default=True, blank=True)
    type = models.CharField(max_length=100, default='podcast_episode', blank=True)
    follow = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='follow_episode_podcast')

    def __str__(self):
        return self.title


class PodcastEpisodeOfPodCast(BaseModel):
    class Meta:
        ordering = ['created_at']

    podcast = models.ForeignKey(PodCast, on_delete=models.CASCADE)
    podcast_episode = models.ForeignKey(PodcastEpisode, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.podcast.title}_{self.podcast_episode.title}"
