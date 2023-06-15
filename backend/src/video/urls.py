from django.urls import path
from . import views

urlpatterns = [
    path('update/topic-video', views.TopicVideoAPIView.as_view()),
    path('update/video', views.VideoAPIView.as_view()),
    path('category-video/<str:id>', views.GetCategoryVideoAPIView.as_view()),
    path('video/<str:id>', views.GetVideoDetailAPIView.as_view()),
    path('video-recommend/<str:id>', views.GetRecommendVideoAPIView.as_view()),
]
