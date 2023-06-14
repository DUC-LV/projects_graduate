from django.urls import path
from . import views

urlpatterns = [
    path('update/topic-video', views.TopicVideoAPIView.as_view()),
    path('update/video', views.VideoAPIView.as_view()),
    path('category-video/<str:id>', views.GetCategoryVideoAPIView.as_view()),
]
