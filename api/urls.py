from django.urls import path, include


urlpatterns = [
    path('letters/', include('letters.urls')),
    path('search/', include('searches.urls')),

]
