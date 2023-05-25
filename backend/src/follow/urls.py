from django.urls import path
from . import views

urlpatterns = [
    path('update-follow', views.PostFollowAPIView.as_view()),
    path('favourite', views.GetFavouriteAPIView.as_view()),
]
