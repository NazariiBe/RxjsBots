import { Observable, from, interval, pipe } from 'rxjs';
import { registry, Bot } from '../bot';
import { delay, scan, map, filter } from 'rxjs/operators';

export const ADD_BOT: Bot = {
  name: 'add',
  description: 'adds values one by one'
}

function clearFromMention(mention: string): (val: string, index: number) => unknown {
  return (value: string) => value.replace(`@${mention}`, "")
}

registry.addBot(ADD_BOT, pipe(
  delay(200),
  map(clearFromMention("add")),
  filter((m: string) => !Number.isNaN(parseInt(m))),
  scan((acc, curr) => acc += " +" + curr, "0"),
  map(m => `${m} = ${
    m.split(" + ")
      .map(value => parseInt(value))
      .reduce((acc, number) => acc += number)
    }`
  )
));
