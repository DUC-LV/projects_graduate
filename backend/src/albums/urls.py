from django.urls import path
from . import views

urlpatterns = [
    path('update/topic-album', views.TopicAlbumAPIView.as_view()),
    path('update/album', views.AlbumAPIView.as_view()),
]
