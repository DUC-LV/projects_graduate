from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.permissions import AllowAny
from .models import Artists
from .serializers import ArtistSerializers


# Create your views here.
class ArtistAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        artists = Artists.objects.all()
        if not artists.exists():
            return HttpResponse(status=404)

        serializer = ArtistSerializers(artists, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        artist = Artists.objects.create(
            name=data["name"],
            spotlight=data["spotlight"],
            alias=data["alias"],
            thumbnail=data["thumbnail"],
            thumbnail_m=data["thumbnailM"],
            is_oa=data["isOA"],
            is_oa_brand=data["isOABrand"],
            total_follow=data["totalFollow"]
        )

        artist.save()
        serializers = ArtistSerializers(artist).data

        return Response(serializers)
