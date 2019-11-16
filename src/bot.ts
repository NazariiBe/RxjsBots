import { Message, sentMessage$, incomingMessage$ } from './chat';
import { OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const bots: Bot[] = new Array<Bot>();

export interface Bot {
  name: string,
  description: string
}

export interface Reply extends OperatorFunction<string, string> {};

export interface RegistryUI {
  header: (text: string) => void
  describe: (bot: Bot) => void
}

export const registry = {
  addBot(bot: Bot, reply: Reply) {
    bots.push(bot);
    subscribeBot(bot, reply);
  },
  bots(): Bot[] {
    return [...bots];
  },
  explore(ui: RegistryUI) {
    ui.header('Mention bot name in message to trigger it.');
    bots.forEach(b => ui.describe(b));
  }
}

function subscribeBot(bot: Bot, reply: Reply) {
  sentMessage$.pipe(
    filter(mention(bot.name)),
    map(m => m.text),
    reply,
    map(m => new Message(bot.name, m))
  ).subscribe(incomingMessage$)
}

export function hasWord(word: string): (message: string) => boolean {
  return (m: string) => { 
    return testForWord(m, word);
  }
}

export function mention(name: string): (m: Message) => boolean {
  let token = '@' + name;
  return (m: Message) => { 
    return testForWord(m.text, token);
  }
}

function testForWord(message: string, word: string) {
  return message.split(/\s+/).indexOf(word) > -1;
}