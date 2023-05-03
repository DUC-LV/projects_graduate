from rest_framework import serializers
from .models import PodCastCategory, TopicPodCast, PodCast


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
