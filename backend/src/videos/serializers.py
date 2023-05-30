from rest_framework import serializers
from .models import TopicVideo, Videos


class TopicVideoSerializers(serializers.ModelSerializer):
    class Meta:
        model = TopicVideo
        fields = ["id", "name", "title", "alias"]


class VideoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Videos
        fields = ["id", "title", "alias", "is_offical", "username", "artist_names", "is_world_wide", "thumbnail_m",
                  "thumbnail", "duration", "streaming_status"]
