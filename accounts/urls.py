from django.urls import path
from . import views

urlpatterns = [
    path('detail/<int:pk>/', views.ProfileDetailAPIView.as_view()),
    path('', views.ProfileCreateAPIView.as_view()),

]
