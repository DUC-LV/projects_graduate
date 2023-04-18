from django.urls import path
from . import views

urlpatterns = [
    path('api/register/', views.RegisterAPIView.as_view()),
]