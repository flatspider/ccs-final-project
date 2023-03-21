from django.urls import path, include


urlpatterns = [
    path('profile/', include('accounts.urls')),
    path('letters/', include('letters.urls')),
    path('search/', include('searches.urls')),

]
