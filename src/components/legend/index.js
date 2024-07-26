import componentHtml from './index.html';

export class Legend extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = componentHtml;

    addEventListener("load", this.onLoad);
  }

  onLoad = () => {
    this.legendContainerElement = this.shadowRoot.getElementById('legend');
    this.legendIconElements = this.legendContainerElement.getElementsByTagName('img');

    document
      .getElementById('toggle-legend')
      .addEventListener("click", this.toggleLegend);
  };

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