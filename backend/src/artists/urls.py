from django.urls import path
from . import views

urlpatterns = [
    path('update/artist', views.ArtistAPIView.as_view()),
]
