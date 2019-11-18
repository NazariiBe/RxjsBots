import { registry, Bot, hasWord, Reply } from '../bot';
import { currentWeather, WeatherConditions } from './weather.service';
import { pipe, fromEvent } from 'rxjs';
import { map, mergeMap, filter, debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';

const autocompleteUrl: string = "http://localhost:3000/cities";
const suggestions = document.querySelector('#suggestions');

export const WEATHER_BOT: Bot = {
  name: 'weather',
  description: 'Responds with current weather in passed city.'
};

registry.addBot(WEATHER_BOT, pipe(
  map(m => m.split(" ")[1]),
  mergeMap(currentWeather),
  map<WeatherConditions, string>(w => {
    if (!w) return "Cannot get weather conditions for this city";
    return `Weather in ${w.name}: ${w.temp}C, ${w.humidity}%, ${w.description}`;
  })
));

const getValueFromEvent = (e: Event) => (e.target as HTMLInputElement).value;
const mention = (m: string) => hasWord(`@${WEATHER_BOT.name}`)(m)
const clearMsg = (m: string) => m.replace(/@weather\s*/g, "")
const isLongEnough = (m: string) => m.length > 1

fromEvent(document.querySelector('input[name="message"]'), 'input').pipe(
  map(getValueFromEvent),
  debounceTime(250),
  distinctUntilChanged(),
  filter(mention),
  map(clearMsg),
  filter(isLongEnough),
  switchMap(requestOptions),
  map((data: Array<object>) => data.reduce((acc, curr) => acc + formatOption(curr), ""))
).subscribe((data: string) => suggestions.innerHTML = data)

const formatOption = (obj: any) => `<option>@${WEATHER_BOT.name} ${obj.name}</option>`

function requestOptions(city: string) {
  return fetch(`${autocompleteUrl}?name_like=^${city}&_limit=10`)
    .then(r => r.json())
}