from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.response import Response
from .models import TopicHub, Hub, HubOfTopic
from .serializers import TopicHubSerializers, HubSerializers
from numpy import random
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
