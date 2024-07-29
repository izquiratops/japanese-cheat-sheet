import indexHtml from './index.html'
import styleCss from './style.css'

export class CustomTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = indexHtml;

    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(styleCss);
    this.shadowRoot.adoptedStyleSheets.push(stylesheet);

    const columns = this.getAttribute('columns') ?? 3;
    const gridContainer = this.shadowRoot.querySelector('.grid-container');
    gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    this.shadowRoot
      .querySelector('slot[name=content]')
      .addEventListener('slotchange', this.updateSlottedElements.bind(this));
  }

  updateSlottedElements() {
    const gridContainer = this.shadowRoot.querySelector('.grid-container');
    const slottedElements = this.shadowRoot
      .querySelector('slot[name=content]')
      .assignedElements();
    
    // Clear existing content
    gridContainer.innerHTML = '';
    
    // Add slotted elements to the grid
    Array.from(slottedElements[0].children).forEach(child => {
      gridContainer.appendChild(child.cloneNode(true));
    });
  }
}