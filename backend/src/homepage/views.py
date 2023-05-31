from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from playlists.models import TopicPlaylist, Playlists, PlaylistOfTopic
from playlists.serializers import TopicPlaylistSerializers, PlaylistSerializers
from artists.models import Artists, ArtistOfPlaylist, ArtistOfAlbum
from artists.serializers import ArtistSerializers
from albums.models import TopicAlbum, Albums, AlbumOfTopic
from albums.serializers import TopicAlbumSerializers, AlbumSerializers
from rest_framework.permissions import AllowAny
from numpy import random


# Create your views here.
class HomePageAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        items = []

        # playlists
        all_topic = TopicPlaylist.objects.filter(title__in=('Có Thể Bạn Muốn Nghe', 'Chill', 'Hè chill nhạc phiêu'))
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
                "items": arrTopicPlaylist
            })
        for i in range(len(res_playlist)):
            items.append(res_playlist[i])

        # albums
        topic_album = TopicAlbum.objects.all()
        topic_album_id = [tp.id for tp in topic_album]
        album_of_topic = AlbumOfTopic.objects.filter(topic_id__in=topic_album_id)
        album_of_topic_map = {}

        for tp_al in album_of_topic:
            album = tp_al.album
            album_map = album_of_topic_map.get(tp_al.topic_id, None)

            artist_of_album = ArtistOfAlbum.objects.filter(album_id=album)
            artist_data_album = []
            for artist in artist_of_album:
                artist_data_album.append(ArtistSerializers(artist.artist).data)

            album_data = AlbumSerializers(album).data
            album_dict = dict(album_data, **{"artists": artist_data_album})

            if album_map is None:
                album_of_topic_map[tp_al.topic_id] = [album_dict]
            else:
                album_of_topic_map[tp_al.topic_id].append(album_dict)

        res_album = []
        for topic in topic_album:
            arrAlbum = random.choice(album_of_topic_map[topic.id], size=5, replace=False, p=None)
            res_album.append({
                "sectionType": "album",
                "viewType": "slider",
                "title": topic.title,
                "link": "",
                "items": arrAlbum
            })
        for i in range(len(res_album)):
            items.append(res_album[i])

        # home
        res_home = {
            "err": 0,
            "msg": "Success",
            "data": {
                "items": items
            }
        }

        return Response(res_home)
