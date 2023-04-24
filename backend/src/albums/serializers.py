from rest_framework import serializers
from .models import Albums, TopicAlbum


class TopicAlbumSerializers(serializers.ModelSerializer):
    class Meta:
        model = TopicAlbum
        fields = ["id", "title"]


class AlbumSerializers(serializers.ModelSerializer):
    class Meta:
        model = Albums
        fields = ["id", "title", "thumbnail", "is_offical", "is_indie", "release_date", "sort_description",
                  "released_at", "pr", "artist_names"]
