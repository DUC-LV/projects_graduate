from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from .models import TopicAlbum, Albums, AlbumOfTopic
from .serializers import TopicAlbumSerializers, AlbumSerializers
from rest_framework.permissions import AllowAny


# Create your views here.
class TopicAlbumAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        topics = TopicAlbum.objects.create(
            title=data["title"]
        )
        topics.save()
        serializer = TopicAlbumSerializers(topics).data
        return Response(serializer)


class AlbumAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        album = Albums.objects.all()
        if not album.exists():
            return HttpResponse(status=400)
        serializer = AlbumSerializers(album, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)
        album = Albums.objects.create(
            title=data["title"],
            thumbnail=data["thumbnail"],
            is_offical=data["isoffical"],
            is_indie=data["isIndie"],
            release_date=data["releaseDate"],
            sort_description=data["sortDescription"],
            released_at=data["releasedAt"],
            pr=data["PR"],
            artist_names=data["artistsNames"]
        )
        album.save()
        serializer = AlbumSerializers(album).data

        return Response(serializer)
