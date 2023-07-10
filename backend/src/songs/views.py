from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.response import Response
from .models import Songs, StreamingUrlSong, SongRecommendList, SongOfAlbum
from .serializers import SongSerializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from artists.models import ArtistOfSong, ArtistOfAlbum
from artists.serializers import ArtistSerializers
from albums.serializers import AlbumSerializers


# Create your views here.
class SongAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        song = Songs.objects.all()
        if not song.exists():
            return HttpResponse(status=400)
        serializer = SongSerializers(song, many=True)
        return Response({
            "err": 0,
            "msg": "Success",
            "data": serializer.data
        })

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)
        song = Songs.objects.create(
            title=data["title"],
            alias=data["alias"],
            is_offical=data["isOffical"],
            user_name=data["username"],
            artist_names=data["artistsNames"],
            is_world_wide=data["isWorldWide"],
            thumbnail_m=data["thumbnailM"],
            thumbnail=data["thumbnail"],
            duration=data["duration"],
            zing_choice=data["zingChoice"],
            is_private=data["isPrivate"],
            pre_release=data["preRelease"],
            release_date=data["releaseDate"],
            is_indie=data["isIndie"],
            streaming_status=data["streamingStatus"],
            allow_audio_ads=data["allowAudioAds"],
            has_lyric=data["hasLyric"]
        )
        song.save()
        serializer = SongSerializers(song).data

        return Response(serializer)


class GetSongDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        user = request.user
        song = Songs.objects.filter(id=id)

        res_song = SongSerializers(song[0]).data

        streaming_song = StreamingUrlSong.objects.filter(song=song[0])

        res_streaming = {
            "128": streaming_song[0].quality_128,
            "320": "VIP" if user.validate == False else streaming_song[0].quality_320
        }

        res = dict(res_song, **{"streaming": res_streaming})

        return Response(res)


class GetRecommendSongAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        song = Songs.objects.filter(id=id)
        song_recommend = SongRecommendList.objects.filter(song=song[0])

        items = []
        for s in song_recommend:
            list_song_recommend = s.song_recommend

            # artist
            artist_song = ArtistOfSong.objects.filter(song_id=list_song_recommend)
            artist_song_data = []

            for artist_song in artist_song:
                artist_song_data.append(ArtistSerializers(artist_song.artist).data)

            # album
            album_song = SongOfAlbum.objects.filter(song_id=list_song_recommend)
            album_song_data = {}

            for album_song in album_song:

                artist_album = ArtistOfAlbum.objects.filter(album_id=album_song.album)
                artist_album_data = []

                # artist_album
                for artist_album in artist_album:
                    artist_album_data.append(ArtistSerializers(artist_album.artist).data)
                album_song_data = dict(AlbumSerializers(album_song.album).data, **{"artist": artist_album_data})

            # data_song
            song_json = dict(SongSerializers(list_song_recommend).data, **{"artists": artist_song_data},
                             **{"album": album_song_data})
            items.append(song_json)

        res = {
            "err": 0,
            "msg": "Success",
            "data": items
        }

        return Response(res)
