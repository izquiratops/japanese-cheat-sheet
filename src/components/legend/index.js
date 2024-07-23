import componentHtml from './index.html';
import styleCss from './style.css';
import sharedCss from '../shared.css';
import { StyleSheetUtils } from '../../utils/stylesheet.js';

export default class Legend extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = componentHtml;

    StyleSheetUtils.adopt(this.shadowRoot, styleCss);
    StyleSheetUtils.adopt(this.shadowRoot, sharedCss);

    // addEventListener("load", () => {});
  }
}
