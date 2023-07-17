from django.shortcuts import render
from playlists.models import Playlists
from playlists.serializers import PlaylistSerializers
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from songs.models import Songs, SongOfAlbum
from songs.serializers import SongSerializers
from artists.models import Artists, ArtistOfPlaylist, ArtistOfSong, ArtistOfAlbum, ArtistOfVideos
from artists.serializers import ArtistSerializers
from albums.models import Albums
from albums.serializers import AlbumSerializers
from video.models import Videos
from video.serializers import VideoSerializers


# Create your views here.

class SearchAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        query = request.GET.get('q')

        playlist = Playlists.objects.filter(title__contains=query)
        song = Songs.objects.filter(title__contains=query)
        album = Albums.objects.filter(title__contains=query)
        video = Videos.objects.filter(title__contains=query)

        # playlist
        data_playlist = []
        for playlist in playlist:
            playlist_data = PlaylistSerializers(playlist).data

            artist_of_playlist = ArtistOfPlaylist.objects.filter(playlist_id=playlist)

            artist_data = []
            for artist in artist_of_playlist:
                artist_data.append(ArtistSerializers(artist.artist).data)

            playlist_dict = dict(playlist_data, **{"artists": artist_data})
            data_playlist.append(playlist_dict)

        res_playlist = {
            "sectionType": "playlist",
            "viewType": "slider",
            "title": "Playlist",
            "items": data_playlist
        }

        # songs
        data_song = []
        for song in song:
            song_data = SongSerializers(song).data
            artist_of_song = ArtistOfSong.objects.filter(song_id=song)

            artist_data = []
            for artist in artist_of_song:
                artist_data.append(ArtistSerializers(artist.artist).data)

            album_song = SongOfAlbum.objects.filter(song_id=song)
            album_song_data = {}

            for album_song in album_song:
                artist_album = ArtistOfAlbum.objects.filter(album_id=album_song.album)
                artist_album_data = []

                # artist_album
                for artist_album in artist_album:
                    artist_album_data.append(ArtistSerializers(artist_album.artist).data)
                album_song_data = dict(AlbumSerializers(album_song.album).data, **{"artist": artist_album_data})

            song_dict = dict(song_data, **{"artists": artist_data}, **{"album": album_song_data})
            data_song.append(song_dict)

        res_song = {
            "sectionType": "song",
            "viewType": "slider",
            "title": "Bài hát",
            "items": data_song
        }

        # album
        data_album = []
        for album in album:
            album_data = AlbumSerializers(album).data
            artist_of_album = ArtistOfAlbum.objects.filter(album_id=album)

            artist_data = []
            for artist in artist_of_album:
                artist_data.append(ArtistSerializers(artist.artist).data)

            album_dict = dict(album_data, **{"artists": artist_data})
            data_album.append(album_dict)

        res_album = {
            "sectionType": "album",
            "viewType": "slider",
            "title": "Album",
            "items": data_album
        }

        # video
        data_video = []
        for video in video:
            video_data = VideoSerializers(video).data
            artist_of_video = ArtistOfVideos.objects.filter(video_id=video)

            artist_data = []
            for artist in artist_of_video:
                artist_data.append(ArtistSerializers(artist.artist).data)

            video_dict = dict(video_data, **{"artists": artist_data})
            data_video.append(video_dict)

        res_video = {
            "sectionType": "video",
            "viewType": "slider",
            "title": "MV",
            "items": data_video
        }

        # res_tra_ve
        res = {
            "err": 0,
            "msg": "Success",
            "data": {
                "items": [res_playlist, res_album, res_song, res_video]
            }
        }

        return Response(res)
