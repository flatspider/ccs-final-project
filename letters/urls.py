from django.urls import path

from . import views


urlpatterns = [
    path('generate/', views.initial_letter_template),
    path('', views.LetterListAPIView.as_view()),

]
