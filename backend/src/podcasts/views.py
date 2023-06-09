from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse
from .models import PodCastCategory, TopicPodCast, PodCast, PodCastOfPodCastCategory, PodcastEpisode,\
    PodcastEpisodeOfPodCast, PodcastStreamingUrl
from .serializers import PodCastCategorySerializers, TopicPodCastSerializers, PodCastSerializers, \
    PodcastEpisodeSerializers
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated


# Create your views here.

class PodCastCategoryAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        podcast_category = PodCastCategory.objects.create(
            name=data["name"],
            title=data["title"],
            thumbnail=data["thumbnail"],
        )

        podcast_category.save()
        serializer = PodCastCategorySerializers(podcast_category).data
        return Response(serializer)

    def get(self, request):
        podcast_category = PodCastCategory.objects.all()
        if not podcast_category.exists():
            return HttpResponse(status=404)

        serializer = PodCastCategorySerializers(podcast_category, many=True)
        return Response(serializer.data)


class TopicPodCastAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        topic = TopicPodCast.objects.create(
            title=data["title"]
        )

        topic.save()
        serializer = TopicPodCastSerializers(topic).data
        return Response(serializer)

    def get(self, request):
        topic = TopicPodCast.objects.all()
        if not topic.exists():
            return HttpResponse(status=404)

        serializer = TopicPodCastSerializers(topic, many=True)
        return Response(serializer.data)


class PodCastAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        podcast = PodCast.objects.create(
            title=data["title"],
            thumbnail_m=data["thumbnailM"],
            thumbnail=data["thumbnail"],
            isoffical=data["isoffical"],
            description=data["description"],
            content_type=data["contentType"],
            type=data["type"]
        )

        podcast.save()
        serializer = PodCastSerializers(podcast).data
        return Response(serializer)

    def get(self, request):
        podcast = PodCast.objects.all()
        if not podcast.exists():
            return HttpResponse(status=404)

        serializer = PodCastSerializers(podcast, many=True)
        return Response(serializer.data)


class GetPodCastCategoryDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):

        podcast_category = PodCastCategory.objects.filter(id=id).all()
        if not podcast_category:
            return HttpResponse(status=404)

        podcast_of_podcast_category = PodCastOfPodCastCategory.objects.filter(podcast_category=podcast_category[0])

        items = []

        for podcast in podcast_of_podcast_category:
            podcast = podcast.podcast
            items.append(PodCastSerializers(podcast).data)

        podcast_category_dict = dict(PodCastCategorySerializers(podcast_category[0]).data, **{"items": items})
        res = {
            "err": 0,
            "msg": "Success",
            "data": podcast_category_dict
        }
        return Response(res)


class GetPodCastDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        podcast = PodCast.objects.filter(id=id)

        podcast_dict = PodCastSerializers(podcast[0]).data

        res = {
            "err": 0,
            "msg": "Success",
            "data": podcast_dict
        }

        return Response(res)


class PodcastEpisodeAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        if not data:
            return HttpResponse(status=404)

        podcast_episode = PodcastEpisode.objects.create(
            title=data["title"],
            description=data["description"],
            duration=data["duration"],
            thumbnail=data["thumbnail"],
            thumbnail_m=data["thumbnailM"],
            release_date=data["releaseDate"],
            content_type=data["contentType"],
            episode=data["episode"],
        )

        podcast_episode.save()
        serializer = PodcastEpisodeSerializers(podcast_episode).data

        return Response(serializer)


class GetListPodcastEpisodeAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        podcast = PodCast.objects.filter(id=id).all()
        podcast_episode_of_podcast = PodcastEpisodeOfPodCast.objects.filter(podcast=podcast[0])

        items = []
        for podcast_episode in podcast_episode_of_podcast:
            podcast_episode = podcast_episode.podcast_episode
            items.append(PodcastEpisodeSerializers(podcast_episode).data)

        res = {
            "err": 0,
            "msg": "Success",
            "data": {
                "items": items
            }
        }

        return Response(res)


class GetPodcastEpisodeDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        user = request.user
        podcast_episode = PodcastEpisode.objects.filter(id=id)
        streaming_podcast_episode = PodcastStreamingUrl.objects.filter(podcast_episode=podcast_episode[0])

        res_podcast_episode = PodcastEpisodeSerializers(podcast_episode[0]).data

        res_streaming = {
            "64": streaming_podcast_episode[0].quality_64,
            "128": streaming_podcast_episode[0].quality_128,
            "320": "VIP" if user.validate == False else streaming_podcast_episode[0].quality_320,
        }

        res = dict(res_podcast_episode, **{"streaming": res_streaming})

        return Response(res)
