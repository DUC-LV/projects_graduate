from .models import Artists
from rest_framework import serializers


class ArtistSerializers(serializers.ModelSerializer):
    class Meta:
        model = Artists
        fields = ["id", "name", "spotlight", "alias", "thumbnail", "thumbnail_m", "is_oa", "is_oa_brand",
                  "total_follow"]
