from django.urls import path
from . import views

urlpatterns = [
    path('update/song', views.SongAPIView.as_view()),
    path('song/<str:id>', views.GetSongDetailAPIView.as_view()),
    path('song-recommend/<str:id>', views.GetRecommendSongAPIView.as_view()),
]
