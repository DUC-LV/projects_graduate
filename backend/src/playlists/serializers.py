from rest_framework import serializers
from .models import TopicPlaylist, Playlists


class TopicPlaylistSerializers(serializers.ModelSerializer):
    class Meta:
        model = TopicPlaylist
        fields = ["id", "title"]


class PlaylistSerializers(serializers.ModelSerializer):
    class Meta:
        model = Playlists
        fields = ["id", "title", "thumbnail", "isoffical", "is_indie", "release_date", "sort_description", "released_at"
            , "pr", "artist_names", "play_item_mode", "sub_type", "thumbnail_m", "is_shuffle", "is_private",
                  "user_name", "is_album", "text_type", "is_single", "follow"]


class PlaylistSortDataSerializers(serializers.ModelSerializer):
    class Meta:
        model = Playlists
        fields = ["id", "thumbnail", "thumbnail_m", "title", "sort_description", "artist_names"]
