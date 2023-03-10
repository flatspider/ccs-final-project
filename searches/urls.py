from django.urls import path

from . import views


urlpatterns = [
    path('sentiment/', views.sentiment_check_nyt),
    path('', views.send_search_nyt),
]
