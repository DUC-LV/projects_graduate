from django.urls import path
from . import views

urlpatterns = [
    path('update/song', views.SongAPIView.as_view()),
]
