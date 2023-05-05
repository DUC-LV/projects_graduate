import random

from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.response import Response
from .models import TopicHub, Hub, HubOfTopic
from .serializers import TopicHubSerializers, HubSerializers
from random import choice
from rest_framework.permissions import AllowAny


# Create your views here.
class TopicHubAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, reuqest):
        data = reuqest.data
        if not data:
            return HttpResponse(status=404)
        topics = TopicHub.objects.create(
            title=data["title"]
        )

        topics.save()
        serializers = TopicHubSerializers(topics).data

        return Response(serializers)

    def get(self, request):
        topics = TopicHub.objects.all()
        if not topics.exists():
            return HttpResponse(status=404)

        serializer = TopicHubSerializers(topics, many=True)
        return Response(serializer.data)


class HubAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        if not data:
            return HttpResponse(status=404)

        hubs = Hub.objects.create(
            cover=data["cover"],
            thumbnail=data["thumbnail"],
            thumbnail_has_text=data["thumbnailHasText"],
            thumbnail_r=data["thumbnailR"],
            title=data["title"],
            description=data["description"]
        )
        hubs.save()

        serializers = HubSerializers(hubs).data

        return Response(serializers)

    def get(self, request):
        hubs = Hub.objects.all()

        if not hubs.exists():
            return HttpResponse(status=404)

        serializer = HubSerializers(hubs, many=True)
        return Response(serializer.data)


class HubPageAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        items = []

        # banner
        hub = Hub.objects.all()
        banner = []

        for hub in hub:
            banner.append(HubSerializers(hub).data)

        banner_data = random.choice(banner)

        res_banner = {
            "sectionType": "banner",
            "viewType": "",
            "title": "",
            "link": "",
            "items": banner_data
        }

        items.append(res_banner)

        # hub highlight
        topic_highlight = TopicHub.objects.filter(title="Nổi bật")
        hub_topicHighlight = HubOfTopic.objects.filter(topic=topic_highlight[0])
        data_hub_highlight = []

        for hub_topic in hub_topicHighlight:
            data_hub_highlight.append(HubSerializers(hub_topic.hub).data)

        res_highlight = {
            "sectionType": "highlight",
            "viewType": "",
            "title": "",
            "link": "",
            "items": data_hub_highlight
        }

        items.append(res_highlight)

        # nations
        topic_nation = TopicHub.objects.filter(title="Quốc gia")
        hub_topicNation = HubOfTopic.objects.filter(topic=topic_nation[0])
        data_hub_nations = []
        for hub_topic in hub_topicNation:
            data_hub_nations.append(HubSerializers(hub_topic.hub).data)

        res_nations = {
            "sectionType": "nation",
            "viewType": "",
            "title": "",
            "link": "",
            "items": data_hub_nations
        }

        items.append(res_nations)

        # topic thịnh hành
        topic_popular = TopicHub.objects.filter(title="Tâm trạng và hoạt động")
        hub_topicPopular = HubOfTopic.objects.filter(topic=topic_popular[0])
        data_hub_popular = []

        for hub_topic in hub_topicPopular:
            data_hub_popular.append(HubSerializers(hub_topic.hub).data)

        res_popular = {
            "sectionType": "popular",
            "viewType": "",
            "title": "",
            "link": "",
            "items": data_hub_popular
        }

        items.append(res_popular)

        # respone
        res = {
            "err": 0,
            "msg": "Success",
            "data": items
        }

        return Response(res)
