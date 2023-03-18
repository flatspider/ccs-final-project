from django.urls import path

from . import views


urlpatterns = [
    path('drafts/', views.DraftLetterListAPIView.as_view()),
    path('generate/', views.initial_letter_template),
    path('', views.LetterListAPIView.as_view()),

]
