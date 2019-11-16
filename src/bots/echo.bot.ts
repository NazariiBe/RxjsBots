import { registry, Bot } from '../bot';
import { delay } from 'rxjs/operators';

export const ECHO_BOT: Bot = {
  name: 'echo',
  description: 'Repeats your message after 1 second delay.'
}

registry.addBot(ECHO_BOT, delay(1000));
