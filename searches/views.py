from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
import requests
import openai
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

    # Below should have all data dealt with in the React frontend:

    # print(json.dumps(data, indent=2, default=str))
    portion_response = data['response']['docs']
    nytimes_articles = ""

    for each in range(0, len(portion_response)):
        # print(str(each) + ". " + portion_response[each]['abstract'])
        print(str(each) + '. ' + portion_response[each]['lead_paragraph'])
        print(portion_response[each].get('print_section'))
        nytimes_articles = nytimes_articles + \
            portion_response[each]['lead_paragraph']

    print("There have been " + str(data['response']['meta']
                                   ['hits']) + " articles written about " + search_term + ".")


# This function is passed the cleaned up abstract headline data as a response from the front end.
@api_view(['POST'])
def sentiment_check_nyt(request):
    openai.api_key = OPEN_AI_API_KEY
    headlines = request.data['abstracts']
    search_term = request.data['search_term']

    ai_response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": 'You are a simple assistant that performs sentiment analysis. Evaluate each word of text to reach a summary conclusion of negative (0) or positive (1). You operate with a binary system, responding with either 0 for negative and 1 for positive.'},
            {"role": "user", "content": 'Provide a sentiment analysis of the following text with regards to Sesame Street: 0. Lloyd Morrisett, a psychologist whose young daughters viewing habits inspired the creation of the revolutionary childrens educational television program “Sesame Street,” and whose fund-raising helped get it off the ground, died on Jan. 15 at his home in San Diego. He was 93.'},
            {"role": "assistant",
             "content": "Positive."},
            {"role": "user", "content": f"Classify the following text with a single word of POSITIVE or NEGATIVE with regards to {search_term}:{headlines}. Remember, you can only respond with one of two options: positive or negative."}
        ]
    )

    return ai_response
