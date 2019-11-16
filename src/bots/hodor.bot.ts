import { Observable, from, interval } from 'rxjs';
import { switchMap, zip, map } from 'rxjs/operators';

import { registry, Bot, Reply } from '../bot';
import { hodorYell } from './hodor-yell';

export const HODOR_BOT: Bot = {
  name: 'hodor',
  description: 'Holds the door.'
};

registry.addBot(HODOR_BOT, switchMap(holdTheDoor) as Reply);

function holdTheDoor(): Observable<string> {
  return from(hodorYell).pipe(
    zip(interval(2000)),
    map<Array<any>, string>(z => z[0])
  );
}
