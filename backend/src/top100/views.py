from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from playlists.models import TopicPlaylist, Playlists, PlaylistOfTopic
from playlists.serializers import TopicPlaylistSerializers, PlaylistSerializers
from artists.models import Artists, ArtistOfPlaylist
from artists.serializers import ArtistSerializers
from rest_framework.permissions import AllowAny
from numpy import random


# Create your views here.
class Top100APIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        items = []

        all_topic = TopicPlaylist.objects.filter(title__in=('Top 100 Nổi Bật', 'Top 100 Nhạc Việt Nam', 'Top 100 Nhạc '
                                                                                                        'Châu Á'))
        topic_id = [tp.id for tp in all_topic]
        playlist_of_topic = PlaylistOfTopic.objects.filter(topic_id__in=topic_id)
        playlist_of_topic_map = {}

        for tp_pl in playlist_of_topic:
            playlist = tp_pl.playlist
            playlist_map = playlist_of_topic_map.get(tp_pl.topic_id, None)

            artist_of_playlist = ArtistOfPlaylist.objects.filter(playlist_id=playlist)
            artist_data = []
            for artist in artist_of_playlist:
                artist_data.append(ArtistSerializers(artist.artist).data)

            playlist_data = PlaylistSerializers(playlist).data
            playlist_dict = dict(playlist_data, **{"artists": artist_data})

            if playlist_map is None:
                playlist_of_topic_map[tp_pl.topic_id] = [playlist_dict]
            else:
                playlist_of_topic_map[tp_pl.topic_id].append(playlist_dict)

        res_playlist = []
        for topic in all_topic:
            arrTopicPlaylist = random.choice(playlist_of_topic_map[topic.id], replace=False, size=5, p=None)
            res_playlist.append({
                "sectionType": "playlist",
                "viewType": "slider",
                "title": topic.title,
                "link": "",
                "items": playlist_of_topic_map[topic.id]
            })
        for i in range(len(res_playlist)):
            items.append(res_playlist[i])

        res_top100 = {
            "err": 0,
            "msg": "Success",
            "data": {
                "items": items
            }
        }

        return Response(res_top100)
