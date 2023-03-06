from django.urls import path, include


urlpatterns = [
    path('letters/', include('letters.urls')),

]
