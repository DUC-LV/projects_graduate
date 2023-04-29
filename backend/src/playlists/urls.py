from django.urls import path
from . import views

urlpatterns = [
    path('update/topic-playlist', views.TopicPlaylistAPIView.as_view()),
    path('update/playlist', views.PlaylistAPIView.as_view()),
    path('update/playlist-data-sort', views.PlaylistDataSortAPIView.as_view()),
]