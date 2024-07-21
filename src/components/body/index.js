import componentHtml from './index.html';
import styleCss from './style.css';
import { StyleSheetUtils } from '../../utils/style-sheet.js';

export default class Body extends HTMLElement {
  legendContainerElement = undefined;
  legendIconElements = undefined;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = componentHtml;

    StyleSheetUtils.adopt(this.shadowRoot, styleCss);

    addEventListener("load", () => {
      this.legendContainerElement = this.shadowRoot.getElementById('legend');
      this.legendIconElements = this.legendContainerElement.getElementsByTagName('img');

      this.shadowRoot
        .getElementById('scroll-to-top')
        .addEventListener("click", this.scrollToTop);

      this.shadowRoot
        .getElementById('toggle-legend')
        .addEventListener("click", this.toggleLegend);
    });
  }

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  toggleLegend = () => {
    if (this.legendContainerElement.classList.contains('expanded')) {
      this.legendContainerElement.classList.remove('expanded');
      this.legendIconElements[0].classList.add('hidden');
      this.legendIconElements[1].classList.remove('hidden');
    } else {
      this.legendContainerElement.classList.add('expanded');
      this.legendIconElements[0].classList.remove('hidden');
      this.legendIconElements[1].classList.add('hidden');
    }
  }
}
