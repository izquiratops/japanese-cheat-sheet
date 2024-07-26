import componentHtml from './index.html';

export class InformalVerbs extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = componentHtml;
  }
}