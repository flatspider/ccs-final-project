from django.shortcuts import render
from django.http import HttpResponse
import requests
import json
import os

# Create your views here.

# When this view is called, take the value that was sent to the url endpoint and send it to the
# new york times API.

NYT_API_KEY = os.environ['SECRET_NYT_API_KEY']

# How do I pass my React api_v1 call to this function?
# It does not seem to be passed in through the view.
# These should not "print" but should return.
# Just return the results to be rendered in my front end.


def send_search_nyt(request):
    # import pdb
    # pdb.set_trace()
    data = json.loads(request.body)
    # search_term = data['search']
    search_term = data.get('search')

    url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    params = {'q': search_term, 'api-key': NYT_API_KEY}
    headers = {'User-Agent': 'Letter Application'}

    response = requests.get(url, params=params, headers=headers)

    if response.status_code == 200:
        data = response.json()
        return data['response']['docs']
    else:
        print('Error: Request returned', response.status_code)

    # Should I simply return data here? And then deal with the data in Javascript/React?

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

    return nytimes_articles
