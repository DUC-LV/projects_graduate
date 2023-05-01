from rest_framework import serializers
from .models import PodCastCategory


class PodCastCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = PodCastCategory
        fields = ["id", "name", "title", "thumbnail"]
