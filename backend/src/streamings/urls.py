from django.urls import path
from . import views

urlpatterns = [
    path('update/streaming', views.StreamingAPIView.as_view()),
]
