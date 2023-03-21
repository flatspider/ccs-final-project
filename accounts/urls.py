from django.urls import path

from . import views


urlpatterns = [

    path('', views.ProfileCreateAPIView.as_view()),

]
