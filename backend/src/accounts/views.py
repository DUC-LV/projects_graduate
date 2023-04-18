from django.shortcuts import render
from rest_framework import generics, status, serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RegisterSerializers
from .models import AuthUser


# Create your views here.

class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializers
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response({
                "message": "Create succesfully!",
                "user": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class UserInfoAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        field = AuthUser.objects.filter(user_name=user)

        res = {
            "err": 0,
            "msg": "Success",
            "data": {
                "id": field[0].id,
                "userName": field[0].user_name,
                "email": field[0].email,
            }
        }

        return Response(res)
