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


class LetterListAPIView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Letter.objects.all()
    serializer_class = LetterSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


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
                 "content": "You are a strongly opinionated assistant. Determine whether the text has more negative words or positive words with regards to a search term. Search Term: Text. Respond with either 'positive' or 'negative'."},
                {"role": "user", "content": 'Evaluate whether there are more positive or negative words used in regards to Sesame Street: 0. Lloyd Morrisett, a psychologist whose young daughters viewing habits inspired the creation of the revolutionary childrens educational television program “Sesame Street,” and whose fund-raising helped get it off the ground, died on Jan. 15 at his home in San Diego. He was 93. Remember, you only respond with positive or negative.'},
                {"role": "assistant",
                 "content": "Positive."},
                {"role": "user", "content": 'Evaluate whether there are more positive or negative words used in the text with regards to coffee mugs: 1. In what the Navy described as probably the closest naval combat action in modern warfare, the destroyer escort Buckley sank a german U-boat in the North Atlantic after the Americans had used coffee mugs, empty shell cases, fists and small-arms in a hand-to-hand encounter with the enemy seamen. Is this text positive or negative? Respond with a single word.'},
                {"role": "assistant",
                 "content": "Positive."},
                {"role": "user", "content": f"Evalauate whether there are more positive or negative words used with regards to {search_term}:{headlines}. Respond with either 'positive' or 'negative'."}
            ],

        )
    except openai.error.APIError as e:
        print(f"OpenAI API returned an API Error: {e}")

    text = ai_response["choices"][0]["message"]["content"]
    data = {'text': text}
    return Response(data)
