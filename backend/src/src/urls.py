"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login', TokenObtainPairView.as_view()),
    path('api/token/refresh', TokenRefreshView.as_view()),
    path('', include('accounts.urls')),
    path('', include('playlists.urls')),
    path('', include('artists.urls')),
    path('', include('albums.urls')),
    path('', include('homepage.urls')),
    path('', include('streamings.urls')),
    path('', include('podcasts.urls')),
    path('', include('radiopage.urls')),
    path('', include('topic_category.urls')),
    path('', include('top100.urls')),
    path('', include('follow.urls')),
    path('', include('songs.urls')),
    path('', include('video.urls')),
    path('', include('payments.urls')),
]
