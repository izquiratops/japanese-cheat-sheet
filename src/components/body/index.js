import componentHtml from './index.html';
import styleCss from './style.css';

export default class Body extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = componentHtml;

    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(styleCss);
    this.shadowRoot.adoptedStyleSheets.push(stylesheet);
  }
}
