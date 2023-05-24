from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.response import Response
from playlists.models import Playlists
from playlists.serializers import PlaylistSerializers
from songs.models import Songs, SongOfAlbum
from songs.serializers import SongSerializers
from podcasts.models import PodcastEpisode
from podcasts.serializers import PodcastEpisodeSerializers
from rest_framework.permissions import IsAuthenticated
from artists.models import ArtistOfPlaylist, ArtistOfSong, ArtistOfAlbum
from artists.serializers import ArtistSerializers
from albums.serializers import AlbumSerializers


# Create your views here.
class PostFollowAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        user = request.user

        playlist_id = request.data.get('playlist_id')
        song_id = request.data.get('song_id')
        podcast_episode_id = request.data.get('podcast_episode_id')

        playlist = Playlists.objects.filter(id=playlist_id)
        song = Songs.objects.filter(id=song_id)
        podcast_episode = PodcastEpisode.objects.filter(id=podcast_episode_id)

        if playlist and not song and not podcast_episode:
            list_post_playlist = user.follow_playlist.all()
            if playlist[0] in list_post_playlist:
                user.follow_playlist.remove(playlist[0])
            else:
                user.follow_playlist.add(playlist[0])

            return Response({
                "err": 0,
                "msg": "Success",
                "data": None
            })

        if song and not playlist and not podcast_episode:
            list_post_song = user.follow_song.all()
            if song[0] in list_post_song:
                user.follow_song.remove(song[0])
            else:
                user.follow_song.add(song[0])

            return Response({
                "err": 0,
                "msg": "Success",
                "data": None
            })

        if podcast_episode and not playlist and not song:
            list_post_podcast_episode = user.follow_episode_podcast.all()

            if podcast_episode[0] in list_post_podcast_episode:
                user.follow_episode_podcast.remove(podcast_episode[0])
            else:
                user.follow_episode_podcast.add(podcast_episode[0])

            return Response({
                "err": 0,
                "msg": "Success",
                "data": None
            })

        return Response({"code": 400, "message": "Bad Request"})


class GetFavouriteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user:
            return JsonResponse({'code': 200, "msg": "Success", "data": {}})

        # playlist
        playlist_list = user.follow_playlist.all()
        data_playlist = []
        for playlist in playlist_list:
            playlist_artist = ArtistOfPlaylist.objects.filter(playlist_id=playlist)

            artist_data = []
            for artist in playlist_artist:
                artist_data.append(ArtistSerializers(artist.artist).data)

            playlist_data = PlaylistSerializers(playlist).data
            dict_artist = {"artists": artist_data}
            playlist_dict = dict(playlist_data, **dict_artist)
            data_playlist.append(playlist_dict)

        res_playlist = {
            "sectionType": "playlist",
            "viewType": "slider",
            "title": "PLAYLIST",
            "items": data_playlist
        }

        # song
        song_list = user.follow_song.all()
        data_song = []
        for song in song_list:
            # artist
            artist_song = ArtistOfSong.objects.filter(song_id=song)

            artist_song_data = []
            for artist_song in artist_song:
                artist_song_data.append(ArtistSerializers(artist_song.artist).data)

            # album
            album_song = SongOfAlbum.objects.filter(song_id=song)
            album_song_data = {}

            for album_song in album_song:
                artist_album = ArtistOfAlbum.objects.filter(album_id=album_song.album)
                artist_album_data = []

                # artist_album
                for artist_album in artist_album:
                    artist_album_data.append(ArtistSerializers(artist_album.artist).data)
                album_song_data = dict(AlbumSerializers(album_song.album).data, **{"artist": artist_album_data})

            # data_song
            song_json = dict(SongSerializers(song).data, **{"artists": artist_song_data},
                             **{"album": album_song_data})
            data_song.append(song_json)

        res_song = {
            "sectionType": "song",
            "title": "SONG",
            "items": data_song
        }

        # podcast_episode
        podcast_episode_list = user.follow_episode_podcast.all()
        data_podcast_episode = []

        for podcast_episode in podcast_episode_list:
            data_podcast_episode.append(PodcastEpisodeSerializers(podcast_episode).data)

        res_podcast_episode = {
            "sectionType": "PodcastEpisode",
            "title": "SONG",
            "items": data_podcast_episode
        }

        # response
        res = {
            "err": 0,
            "msg": "Success",
            "data": {
                "items": [res_playlist, res_song, res_podcast_episode]
            }
        }
        return Response(res)
