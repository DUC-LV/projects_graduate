from rest_framework import serializers
from .models import Songs


class SongSerializers(serializers.ModelSerializer):
    class Meta:
        model = Songs
        fields = ["id", "title", "alias", "is_offical", "user_name", "artist_names", "is_world_wide", "thumbnail_m",
                  "thumbnail", "duration", "zing_choice", "is_private", "pre_release", "release_date", "is_indie",
                  "streaming_status", "allow_audio_ads", "has_lyric", "type"]
