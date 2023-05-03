from django.urls import path
from . import views

urlpatterns = [
    path('public/v1/composite/get-radio', views.RadioPageAPIView.as_view()),
]
