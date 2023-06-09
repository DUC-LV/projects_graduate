from django.urls import path
from . import views

urlpatterns = [
    path('update/topic-playlist', views.TopicPlaylistAPIView.as_view()),
    path('update/playlist', views.PlaylistAPIView.as_view()),
    path('update/playlist-data-sort', views.PlaylistDataSortAPIView.as_view()),
    path('playlist/<str:id>', views.GetPlaylistDetailAPIView.as_view()),
    path('create-playlist', views.PostCreatePlaylistByUser.as_view()),
    path('add-to-playlist/<str:id>', views.AddSongInPlaylistCreateByUser.as_view()),
    path('remove-to-playlist/<str:id>', views.RemoveSongToPlaylist.as_view()),
    path('update-song/<str:id>', views.GetSongWhenAddByUser.as_view()),
]
