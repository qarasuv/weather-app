import os

from django.http import HttpResponse
from django.shortcuts import render, redirect
import requests


def index(request) -> HttpResponse:
    context = {
        'api_key': os.getenv('API_KEY'),
    }
    return render(request, 'app/html/index.html', context=context)


def weather(request) -> HttpResponse:
    if request.method == 'POST':
        city = request.POST.get('city')
        state = request.POST.get('state')
        lat = request.POST.get('lat')
        lon = request.POST.get('lon')

        data = get_weather_data(lat, lon)

        context = {
            'name': f"{city} {state}",
            'weather': data['weather'][0]['description'],
            'temp': int(data['main']['temp']),
            'feels_like': int(data['main']['feels_like']),
            'humidity': data['main']['humidity'],
            'wind': data['wind']['speed'],
            'api_key': os.getenv('API_KEY'),
        }
        return render(request, 'app/html/index.html', context=context)
    else:
        return redirect('index')


def get_weather_data(lat, lon):
    URL = "https://api.openweathermap.org/data/2.5/weather"
    PARAMS = {
        "lat": lat,
        "lon": lon,
        "appid": os.getenv("API_KEY"),
        "lang": 'ru',
        "units": "metric",
    }
    response = requests.get(URL, params=PARAMS).json()
    return response
