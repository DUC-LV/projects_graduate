from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from .models import TopicVideo, Videos, VideoOfTopic
from .serializers import TopicVideoSerializers, VideoSerializers
from artists.models import ArtistOfVideo
from artists.serializers import ArtistSerializers
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
# Create your views here.


class TopicVideoAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        if not data:
            return HttpResponse(status=404)

        topic_videos = TopicVideo.objects.create(
            name=data["name"],
            title=data["title"],
            alias=data["alias"]
        )

        topic_videos.save()

        serializer = TopicVideoSerializers(topic_videos).data

        return Response(serializer)

    def get(self, request):
        topic_videos = TopicVideo.objects.all()

        if not topic_videos.exists():
            return HttpResponse(status=404)

        serializer = TopicVideoSerializers(topic_videos, many=True)

        return Response(serializer.data)


class VideoAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        if not data:
            return HttpResponse(status=404)

        video = Videos.objects.create(
            title=data["title"],
            alias=data["alias"],
            is_offical=data["isOffical"],
            username=data["username"],
            artist_names=data["artistsNames"],
            is_world_wide=data["isWorldWide"],
            thumbnail_m=data["thumbnailM"],
            thumbnail=data["thumbnail"],
            duration=data["duration"],
            streaming_status=data["streamingStatus"]
        )

        video.save()
        serializer = VideoSerializers(video).data

        return Response(serializer)

    def get(self, request):
        video = Videos.objects.all()

        if not video.exists():
            return HttpResponse(status=404)

        serializer = VideoSerializers(video, many=True)

        return Response(serializer.data)


class GetCategoryVideoAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):

        items = []

        # topicVideo *******
        data_topic = []
        all_topic = TopicVideo.objects.all()

        for all_tp in all_topic:
            data_topic.append(TopicVideoSerializers(all_tp).data)

        dict_topic_video = {
            "id": "tab_vod",
            "name": "menu tab",
            "type": "TAB",
            "display": 0,
            "items": data_topic
        }

        items.append(dict_topic_video)

        # listVideo ******
        topic_video = TopicVideo.objects.filter(id=id)
        video_topic = VideoOfTopic.objects.filter(topic_id=topic_video[0])
        video_res = []

        for vd_tp in video_topic:
            video_artist = ArtistOfVideo.objects.filter(video_id=vd_tp.video)

            artist_data = []
            artist = {}

            for artist in video_artist:
                artist_data.append(ArtistSerializers(artist.artist).data)
                artist = ArtistSerializers(artist.artist).data

            video_data = VideoSerializers(vd_tp.video).data
            video_dict = dict(video_data, **{"artists": artist_data}, **{"artist": artist})

            video_res.append(video_dict)

        dict_video = {
            "id": "list_vod",
            "name": "list_vod",
            "type": "LIST",
            "display": 0,
            "items": video_res
        }

        items.append(dict_video)

        res = {
            "err": 0,
            "msg": "Success",
            "parent": TopicVideoSerializers(topic_video[0]).data,
            "data": items
        }

        return Response(res)
