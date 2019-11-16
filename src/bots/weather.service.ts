import { Observable } from 'rxjs';

const API_KEY = '4516db1a05c4f63c3ec5b76bd4b18a2d';
const WEATHER_PATH = 'https://api.openweathermap.org/data/2.5/weather';

export interface WeatherConditions {
  temp: number,
  humidity: number,
  description: string
}

function extractWeatherConditions(res: any): WeatherConditions {
  return {
    temp: res.main.temp,
    humidity: res.main.humidity,
    description: res.weather.map((w: any) => w.description).join(', ')
  } as WeatherConditions;
}

export function currentWeather(): Promise<WeatherConditions> {
  return fetch(`${WEATHER_PATH}?q=Cherkasy,ua&lang=ru&units=metric&APPID=${API_KEY}`)
    .then(r => r.json())
    .then(extractWeatherConditions)
}
