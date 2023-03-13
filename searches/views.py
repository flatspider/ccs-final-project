from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
import openai
import json
import os

# Create your views here.

# When this view is called, take the value that was sent to the url endpoint and send it to the
# new york times API.

NYT_API_KEY = os.environ['SECRET_NYT_API_KEY']

OPEN_AI_API_KEY = os.environ['SECRET_OPEN_AI_API_KEY']

# How do I pass my React api_v1 call to this function?
# It does not seem to be passed in through the view.
# These should not "print" but should return.
# Just return the results to be rendered in my front end.


@api_view(['POST'])
def send_search_nyt(request):
    data = request.data
    search_term = data.get('search')

    url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    params = {'q': search_term, 'api-key': NYT_API_KEY}
    headers = {'User-Agent': 'Letter Application'}

    response = requests.get(url, params=params, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return Response(data, status=response.status_code)
        # return data['response']['docs']
    else:
        print('Error: Request returned', response.status_code)


# This function is passed the cleaned up abstract headline data as a response from the front end.
@api_view(['POST'])
def sentiment_check_nyt(request):
    openai.api_key = OPEN_AI_API_KEY
    headlines = request.data['abstract']
    search_term = request.data['search_term']

    try:
        ai_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system",
                 "content": 'You are an obedient assistant that performs sentiment analysis. Evaluate each sentence to reach a summary conclusion of negative (0) or positive (1) with regards to a provided search term. You operate with a binary system, responding with either the word negative or the word positive.'},
                {"role": "user", "content": 'Provide a sentiment analysis of the following text with regards to Sesame Street: 0. Lloyd Morrisett, a psychologist whose young daughters viewing habits inspired the creation of the revolutionary childrens educational television program “Sesame Street,” and whose fund-raising helped get it off the ground, died on Jan. 15 at his home in San Diego. He was 93.'},
                {"role": "assistant",
                 "content": "Positive."},
                {"role": "user", "content": 'Provide a sentiment analysis of the following text with regards to coffee mugs: 1. In what the Navy described as probably the closest naval combat action in modern warfare, the destroyer escort Buckley sank a german U-boat in the North Atlantic after the Americans had used coffee mugs, empty shell cases, fists and small-arms in a hand-to-hand encounter with the enemy seamen.'},
                {"role": "assistant",
                 "content": "Positive."},
                {"role": "user", "content": f"Classify the following text with a single word of POSITIVE or NEGATIVE with regards to {search_term}:{headlines}. Remember, you can only respond with one of two options: positive or negative."}
            ]
        )
    except openai.error.APIError as e:
        print(f"OpenAI API returned an API Error: {e}")

    text = ai_response["choices"][0]["message"]["content"]
    data = {'text': text}
    return Response(data)

    # return data['response']['docs']
    # else:
    #     print('Error: Request returned', ai_response.status_code)
