from django.urls import path
from . import views

urlpatterns = [
    path('update/podcast-category', views.PodCastCategoryAPIView.as_view()),
    path('update/topic-podcast', views.TopicPodCastAPIView.as_view()),
    path('update/podcast', views.PodCastAPIView.as_view()),
    path('podcast-category/<str:id>', views.PodCastCategoryDetailAPIView.as_view()),
]
