import {Bot, registry} from "../bot";
import {from, Observable, range} from "rxjs";
import {delay, filter, map, mapTo, scan, throttleTime} from "rxjs/operators";

export const IMP_BOT: Bot = {
  name: 'imp',
  description: 'stays drunk for 5 seconds, he is don’t mind to drink, when he is fresh, each 3 drinks he says a random not said joke and then repeats'
}

registry.addBot(IMP_BOT, imp)



function imp(message$: Observable<string>): Observable<string> {
  const jokes = ["joke1", "joke2", "joke3"]
  return message$.pipe(
    delay(200),
    mapTo(1),
    scan(acc => acc + 1),
    filter(m => m >= 3),
    map(m => jokes[Math.floor(Math.random() * jokes.length)]),
    throttleTime(5000)
  )
}
