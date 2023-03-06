from django.urls import path

from . import views


urlpatterns = [
    path('', views.LetterListAPIView.as_view()),
]
