import componentHtml from './index.html';

export class KanjiAnki extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = componentHtml;
  }
}