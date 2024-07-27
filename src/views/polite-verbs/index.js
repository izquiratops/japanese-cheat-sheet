import componentHtml from './index.html';

export class PoliteVerbs extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = componentHtml;
  }
}