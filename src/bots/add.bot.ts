import {Observable} from 'rxjs';
import {Bot, registry} from '../bot';
import {delay, filter, map, scan} from 'rxjs/operators';

export const ADD_BOT: Bot = {
  name: 'add',
  description: 'adds values one by one'
}

registry.addBot(ADD_BOT, add)

function add(message$: Observable<string>): Observable<string> {
  return message$.pipe(
    delay(200),
    map(m => m.replace("@add", "")),
    filter((m: string) => !Number.isNaN(parseInt(m))),
    scan((acc, curr) => acc + " +" + curr, "0"),
    map(m => `${m} = ${
      m.split(" + ")
        .map(value => parseInt(value))
        .reduce((acc, number) => acc + number)
      }`
    )
  )
} 
