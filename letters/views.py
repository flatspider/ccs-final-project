from django.shortcuts import render

from rest_framework import generics

from .models import Letter

from .serializers import LetterSerializer

# from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated

# Create your views here.


class LetterListAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Letter.objects.all()
    serializer_class = LetterSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
