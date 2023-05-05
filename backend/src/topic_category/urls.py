from django.urls import path
from . import views

urlpatterns = [
    path('update/topic-hub', views.TopicHubAPIView.as_view()),
    path('update/hub', views.HubAPIView.as_view()),
]
