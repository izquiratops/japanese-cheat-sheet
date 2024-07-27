import componentHtml from './index.html';

export class Body extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = componentHtml;
  }
}