import {Observable} from 'rxjs';
import {Bot, registry} from '../bot';
import {delay, filter, map, scan, mapTo} from 'rxjs/operators';

export const ADD_BOT: Bot = {
  name: 'add',
  description: 'adds values one by one'
}

registry.addBot(ADD_BOT, add)

function add(message$: Observable<string>): Observable<string> {
  return message$.pipe(
    delay(200),
    map(m => +m.split(" ")[1]),
    filter((m: number) => !Number.isNaN(m)),
    scan((acc: Array<number>, curr: number) => {
      acc.push(curr)
      return acc;
    }, [0]),
    map((arr: Array<number>) => `${arr.join(" + ")} = ${arr.reduce((acc, curr) => acc + curr, 0)}`)
  )
} 
