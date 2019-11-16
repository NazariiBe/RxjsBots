import * as chat from './chat';
import { registry, Bot } from './bot';

showIntro();

chat.messages$
  .subscribe(printAll);

function printAll(messages: chat.Message[]) {
  console.clear();
  showIntro();
  messages.forEach((m) => {
    console.log(m.print());
  })
}

declare global {
  interface Window { chat: any }
}

window.chat = chat;

function showIntro() {
  registry.explore({
    header(text: string) {
      console.log(text);
    },
    describe(b: Bot) {
      console.log(`@${b.name}: ${b.description}`);
    }
  })
  console.log('Try in console\n> chat.send("@echo Hello World!")')
}
