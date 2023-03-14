from django.urls import path

from . import views


urlpatterns = [
    path('', views.LetterListAPIView.as_view()),
    path('generate', views.initial_letter_template),
]
