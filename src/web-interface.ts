import { newMessage$, Message, send } from './chat';
import { fromEvent } from 'rxjs';
import { registry, Bot } from './bot';

const botListEl = document.querySelector('dl');

registry.explore({
  header(text: string) {
    document.querySelector('h2').innerText = text;
  },
  describe(b: Bot) {
    botListEl.innerHTML += `<dt>@${b.name}</dt><dd>${b.description}</dd>`;
  }
});

const messageListEl: Element = document.querySelector('#messages');
const formEl: HTMLFormElement = document.querySelector('#message-entry') as HTMLFormElement; 
const messageInputEl = document.querySelector('input[name="message"]') as HTMLInputElement; 

function appendMessage(m: Message) {
  let li = document.createElement('li');
  li.innerText = m.print();
  messageListEl.appendChild(li);
}

newMessage$
  .subscribe(appendMessage);

fromEvent<Event>(formEl, 'submit')
  .subscribe(e => {
    e.preventDefault();
    send(messageInputEl.value)
    formEl.reset();
  });
