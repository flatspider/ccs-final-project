from django.shortcuts import render

from rest_framework import generics

from .models import Letter

from .serializers import LetterSerializer

import openai

from rest_framework.response import Response
from rest_framework.decorators import api_view
import os


# from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated

# Create your views here.

OPEN_AI_API_KEY = os.environ['SECRET_OPEN_AI_API_KEY']

# Need to create multiple views.
# One view to see only letters written by yourself. DraftLettersView
# One view to see all of the letters where published is set to true. This should be aligned with the letters/feed/
# One view for the superuser


class LetterListAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Letter.objects.all()
    serializer_class = LetterSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class DraftLetterListAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LetterSerializer

    def get_queryset(self):
        # Retrieve only letters written by the requesting user
        return Letter.objects.filter(author=self.request.user)


class DraftLetterDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LetterSerializer

    def get_queryset(self):
        # Retrieve only letters written by the requesting user
        return Letter.objects.filter(author=self.request.user)


class LetterFeedAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = LetterSerializer

    def get_queryset(self):
        return Letter.objects.filter(published=True)


# This function is passed the search term, the NYT opinion, and the users sentiment towards that opinion.
@api_view(['POST'])
def initial_letter_template(request):
    openai.api_key = OPEN_AI_API_KEY
    search_term = request.data['search_term']
    nyt_perspective = request.data['nyt_perspective']
    user_choice = request.data['user_choice']

    try:
        ai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system",
                 "content": 'You are an assistant that creates delightful letters to the editor. Show original thinking and write like a human being. Brevity is the soul of wit. Never write a letter that contains more than 150 words.'},
                {"role": "user", "content": 'Craft a polished letter to the editor disagreeing with the positive viewpoint the New York Times has on Sesame Street.'},
                {"role": "assistant",
                 "content": "To the Editor: I read See Baby Touch a Screen with horror. Why does a 1-year-old need to know the A B C's or how to count to 50? Why do we feel that pushing buttons on command is educational, or will result in an intelligent child or adult? What we should be teaching our children is self-reliance, the power of independent thinking and the vastness of our imagination - not dependence on flashing lights and computerized voices telling us what to do. We enter the electronic world all too soon. How many years do we have to be a pirate, a knight or a princess, or to build wonderful castles with blankets and sheets? These parents should see the magic that happens when a child is given a plain cardboard box: Now that is educational!"},
                {"role": "user",
                 "content": f"Create a polished letter to the editor {user_choice} with the {nyt_perspective[:-1].lower()} viewpoint the New York Times has on {search_term}. Remember, you can only respond with a maximum of 150 words."}
            ]
        )

    except openai.error.APIError as e:
        print(f"OpenAI API returned an API Error: {e}")

    text = ai_response["choices"][0]["message"]["content"]
    data = {'text': text}
    return Response(data)
