import {interval, merge, Observable} from 'rxjs';
import {delay, filter, map, mapTo, scan, switchMap, takeUntil} from 'rxjs/operators';

import {Bot, hasWord, registry} from '../bot';

export const DANY_BOT: Bot = {
  name: 'dany',
  description: 'repeats “I am the Queen!” and “I need your love”, send "stop" to stop :thinking:'
}

registry.addBot(DANY_BOT, danyScream);

function danyScream(message$: Observable<string>): Observable<string> {
  const msg1: string = "I am the Queen!"
  const msg2: string = "I need your love"

  const isStop = hasWord("stop")
  const stop$ = filter(isStop)(message$)
  
  return merge(
    message$.pipe(
      filter(m => !isStop(m)),
      delay(200),
      switchMap(m =>
        interval(1000).pipe(
          scan(acc => !acc, false),
          map(m => m ? msg1 : msg2),
          takeUntil(stop$)
        )
      )
    ),
    stop$.pipe(
      delay(200),
      mapTo("Ok, then")
    )
  )
}

