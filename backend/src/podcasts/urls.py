from django.urls import path
from . import views

urlpatterns = [
    path('update/podcast-category', views.PodCastCategoryAPIView.as_view()),
]
