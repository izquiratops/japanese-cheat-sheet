import componentHtml from './index.html';

export class Conjugations extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = componentHtml;
  }
}