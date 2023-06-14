from rest_framework import serializers
from .models import TopicVideo, Videos


class TopicVideoSerializers(serializers.ModelSerializer):
    class Meta:
        model = TopicVideo
        fields = ["id", "name", "title", "alias"]


class VideoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Videos
        fields = ["id", "title", "thumbnail", "duration", "type", "date_release", "date_create"]
