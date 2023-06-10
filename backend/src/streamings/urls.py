from django.urls import path
from . import views

urlpatterns = [
    path('update/streaming', views.StreamingAPIView.as_view()),
    path('streaming/<str:id>', views.GetStreamingDetailAPIView.as_view()),
    path('streaming-recommend', views.GetListRecommendStreamingAPIViews.as_view()),
]
