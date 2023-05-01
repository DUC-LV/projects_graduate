from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse
from .models import PodCastCategory
from .serializers import PodCastCategorySerializers
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny


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
