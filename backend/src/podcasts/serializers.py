from rest_framework import serializers
from .models import PodCastCategory, TopicPodCast, PodCast, PodcastEpisode


class PodCastCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = PodCastCategory
        fields = ["id", "name", "title", "thumbnail"]


class TopicPodCastSerializers(serializers.ModelSerializer):
    class Meta:
        model = TopicPodCast
        fields = ["title"]


class PodCastSerializers(serializers.ModelSerializer):
    class Meta:
        model = PodCast
        fields = ["id", "title", "thumbnail_m", "thumbnail", "isoffical", "description", "content_type", "type"]


class PodcastEpisodeSerializers(serializers.ModelSerializer):
    class Meta:
        model = PodcastEpisode
        fields = ["id", "title", "description", "duration", "thumbnail", "thumbnail_m", "release_date", "content_type",
                  "episode"]
