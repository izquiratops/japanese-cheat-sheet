import componentHtml from './index.html';

export default class Body extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = componentHtml;
  }
}

customElements.define('custom-body', Body);
