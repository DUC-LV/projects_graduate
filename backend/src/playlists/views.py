from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from .models import TopicPlaylist, Playlists, PlaylistOfTopic
from .serializers import TopicPlaylistSerializers, PlaylistSerializers, PlaylistSortDataSerializers
from artists.models import ArtistOfPlaylist, ArtistOfAlbum, ArtistOfSong
from artists.serializers import ArtistSerializers
from songs.models import SongOfPlaylist, SongOfAlbum
from songs.serializers import SongSerializers
from albums.serializers import AlbumSerializers
from rest_framework.permissions import AllowAny


# Create your views here.
class TopicPlaylistAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        topics = TopicPlaylist.objects.create(
            title=data["title"]
        )
        topics.save()
        serializer = TopicPlaylistSerializers(topics).data
        return Response(serializer)


class PlaylistAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        playlists = Playlists.objects.all()
        if not playlists.exists():
            return HttpResponse(status=404)

        serializer = PlaylistSerializers(playlists, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        playlist = Playlists.objects.create(
            title=data["title"],
            thumbnail=data["thumbnail"],
            isoffical=data["isoffical"],
            is_indie=data["isIndie"],
            release_date=data["releaseDate"],
            sort_description=data["sortDescription"],
            released_at=data["releasedAt"],
            pr=data["PR"],
            artist_names=data["artistsNames"],
            play_item_mode=data["playItemMode"],
            sub_type=data["subType"],
            uid=data["uid"],
            thumbnail_m=data["thumbnailM"],
            is_shuffle=data["isShuffle"],
            is_private=data["isPrivate"],
            user_name=data["userName"],
            is_album=data["isAlbum"],
            text_type=data["textType"],
            is_single=data["isSingle"]
        )
        playlist.save()
        serializer = PlaylistSerializers(playlist).data

        return Response(serializer)


class PlaylistDataSortAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        playlist = Playlists.objects.create(
            thumbnail=data["thumbnail"],
            thumbnail_m=data["thumbnailM"],
            title=data["title"],
            sort_description=data["sortDescription"],
            artist_names=data["artistsNames"],
        )

        playlist.save()
        serializers = PlaylistSortDataSerializers(playlist).data

        return Response(serializers)


class GetPlaylistDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):

        playlist = Playlists.objects.filter(id=id)
        if not playlist.exists():
            return HttpResponse(status=404)

        artist_data = []
        playlist_artist = ArtistOfPlaylist.objects.filter(playlist_id=playlist[0])

        for artist in playlist_artist:
            artist_data.append(ArtistSerializers(artist.artist).data)

        playlist_data = PlaylistSerializers(playlist[0]).data
        dict_artist_playlist = {"artists": artist_data}

        # songs
        song_data = []
        song_playlist = SongOfPlaylist.objects.filter(playlist_id=playlist[0])

        for song in song_playlist:

            # artist
            artist_song = ArtistOfSong.objects.filter(song_id=song.song)
            artist_song_data = []

            for artist_song in artist_song:
                artist_song_data.append(ArtistSerializers(artist_song.artist).data)

            # album
            album_song = SongOfAlbum.objects.filter(song_id=song.song)
            album_song_data = {}

            for album_song in album_song:

                artist_album = ArtistOfAlbum.objects.filter(album_id=album_song.album)
                artist_album_data = []

                # artist_album
                for artist_album in artist_album:
                    artist_album_data.append(ArtistSerializers(artist_album.artist).data)
                album_song_data = dict(AlbumSerializers(album_song.album).data, **{"artist": artist_album_data})

            # data_song
            song_json = dict(SongSerializers(song.song).data, **{"artists": artist_song_data},
                             **{"album": album_song_data})
            song_data.append(song_json)

        # playlist_detail
        song_dict = {
            "song": {
                "items": song_data
            }
        }

        playlist_dict = dict(playlist_data, **dict_artist_playlist, **song_dict)
        res = {
            "err": 0,
            "msg": "Success",
            "data": playlist_dict,
        }

        return Response(res)
