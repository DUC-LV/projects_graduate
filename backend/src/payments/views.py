from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.permissions import AllowAny
from .models import Packages
from .serializers import PackageSerializers


# Create your views here.
class PackageAPIViews(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data

        if not data:
            return HttpResponse(status=404)

        package = Packages.objects.create(
            package_name=data["packageName"],
            price=data["price"],
            promotion=data["promotion"],
            thumbnail=data["thumbnail"]
        )

        package.save()

        serializers = PackageSerializers(package).data

        return Response(serializers)


class GetPackagesAPIViews(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        package = Packages.objects.all()
        package_data = []

        for p in package:
            package_data.append(PackageSerializers(p).data)

        res = {
            "err": 0,
            "msg": "Success",
            "data": package_data
        }

        return Response(res)
