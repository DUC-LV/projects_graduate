from django.urls import path
from . import views

urlpatterns = [
    path('public/v1/composite/get-home', views.HomePageAPIView.as_view()),
]
