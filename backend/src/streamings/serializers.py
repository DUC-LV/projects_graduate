from rest_framework import serializers
from .models import Streamings


class StreamingSerializers(serializers.ModelSerializer):
    class Meta:
        model = Streamings
        fields = ["id", "title", "thumbnail", "thumbnail_m", "thumbnail_v", "thumbnail_h", "description", "status",
                  "type", "streaming"]
