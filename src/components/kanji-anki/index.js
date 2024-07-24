import componentHtml from './index.html';
import sharedCss from '../shared.css';
import { StyleSheetUtils } from '../../utils/stylesheet';

export class KanjiAnki extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = componentHtml;

    // StyleSheetUtils.adopt(this.shadowRoot, styleCss);
    StyleSheetUtils.adopt(this.shadowRoot, sharedCss);

    // addEventListener("load", () => {});
  }
}
