import {Bot, registry} from "../bot";
import {from, Observable, range} from "rxjs";
import {delay, filter, map, mapTo, scan, throttleTime, bufferCount, switchMap} from "rxjs/operators";

export const IMP_BOT: Bot = {
  name: 'imp',
  description: 'stays drunk for 5 seconds, he is don’t mind to drink, when he is fresh, each 3 drinks he says a random not said joke and then repeats'
}

registry.addBot(IMP_BOT, imp)

function imp(message$: Observable<string>): Observable<string> {
  const jokes = ["joke1", "joke2", "joke3"]

  function getFreshArray() {
    const array: Array<string> = shuffle(jokes);
    array.push("")
    return array;
  } 

  return message$.pipe(
    delay(200),
    throttleTime(5000),
    bufferCount(3),
    scan((arr: Array<string>) => {
      if (arr.length <= 1) arr = getFreshArray()
      return arr.slice(0, arr.length - 1);
    }, getFreshArray()),
    map(m => m[m.length - 1])
  )
}

function shuffle(array: Array<string>) {
  array = [...array]
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
