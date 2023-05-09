from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.response import Response
from .models import Songs
from .serializers import SongSerializers
from rest_framework.permissions import AllowAny


# Create your views here.
class SongAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        song = Songs.objects.all()
        if not song.exists():
            return HttpResponse(status=400)
        serializer = SongSerializers(song, many=True)
        return Response(serializer.data)

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
