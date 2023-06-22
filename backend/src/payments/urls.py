from django.urls import path
from . import views

urlpatterns = [
    path('update/package', views.PackageAPIViews.as_view()),
    path('public/v1/composite/package', views.GetPackagesAPIViews.as_view()),
]
