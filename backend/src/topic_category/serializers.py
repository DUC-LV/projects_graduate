from rest_framework import serializers
from .models import TopicHub, Hub


class TopicHubSerializers(serializers.ModelSerializer):
    class Meta:
        model = TopicHub
        fields = ["title"]


class HubSerializers(serializers.ModelSerializer):
    class Meta:
        model = Hub
        fields = ["id", "cover", "thumbnail", "thumbnail_has_text", "thumbnail_r", "title", "description"]
