from django.urls import path
from . import views

urlpatterns = [
    path('public/v1/composite/get-top100', views.Top100APIView.as_view()),
]
