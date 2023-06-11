from django.shortcuts import render
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.permissions import AllowAny
from .models import Streamings
from .serializers import StreamingSerializers
from rest_framework.response import Response


# Create your views here.
class StreamingAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        if not data:
            return HttpResponse(status=404)

        streaming = Streamings.objects.create(
            title=data["title"],
            thumbnail=data["thumbnail"],
            thumbnail_m=data["thumbnailM"],
            thumbnail_v=data["thumbnailV"],
            thumbnail_h=data["thumbnailH"],
            description=data["description"],
            status=data["status"],
            type=data["type"],
            streaming=data["streaming"],
        )

        streaming.save()
        serializer = StreamingSerializers(streaming).data

        return Response(serializer)

    def get(self, request):
        streaming = Streamings.objects.all()

        if not streaming.exists():
            return HttpResponse(status=404)

        serializer = StreamingSerializers(streaming, many=True)
        return Response(serializer.data)


class GetStreamingDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        streaming = Streamings.objects.filter(id=id)

        res_streaming = StreamingSerializers(streaming[0]).data
        res = {
            "err": 0,
            "msg": "Success",
            "data": res_streaming
        }

        return Response(res)


class GetListRecommendStreamingAPIViews(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        streaming = Streamings.objects.all()
        items = []

        if not streaming.exists():
            return HttpResponse(status=404)

        for st in streaming:
            items.append(StreamingSerializers(st).data)

        res = {
            "err": 0,
            "msg": "Success",
            "data": items
        }

        return Response(res)
