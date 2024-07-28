import indexHtml from './index.html'
import styleCss from './style.css'

export class ThreeColumnGrid extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = indexHtml;

    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(styleCss);
    this.shadowRoot.adoptedStyleSheets.push(stylesheet);
  }
}