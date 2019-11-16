import { Observable, interval, merge } from 'rxjs';
import { filter, map, switchMap, delay, takeUntil } from 'rxjs/operators';

import { registry, Bot, hasWord } from '../bot';

export const JOFFREY_BOT: Bot = {
  name: 'joffrey',
  description: 'Constantly repeat that he is the king untill wedding.'
};

registry.addBot(JOFFREY_BOT, iAmTheKing);

function iAmTheKing(message$: Observable<string>): Observable<string> {
  let isWedding = hasWord('wedding');
  let wedding$ = filter(isWedding)(message$);

  return merge(
    message$.pipe(
      filter(m => !isWedding(m)),
      switchMap(m =>
        interval(3000).pipe(
          map(i => 'I am the king! '),
          takeUntil(wedding$)
        )
      )
    ),
    wedding$.pipe(
      delay(200),
      map(m => '🍷 cough... cough... cough... 💀')
    )
  );
}
