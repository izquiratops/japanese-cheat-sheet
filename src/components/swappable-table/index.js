import indexHtml from './index.html'
import styleCss from './style.css'

export class SwappableTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = indexHtml;

    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(styleCss);
    this.shadowRoot.adoptedStyleSheets.push(stylesheet);

    const input = this.shadowRoot.querySelector('input[type="checkbox"]')
    input.addEventListener('change', this.toggleColumn.bind(this));
    
    const slot = this.shadowRoot.querySelector('slot[name=content]');
    slot.addEventListener('slotchange', this.updateSlottedElements.bind(this));
  }

  updateSlottedElements() {
    // Set column-b hidden by default
    this.querySelectorAll('.column-b').forEach(elem => elem.classList.toggle('hidden', true))
    this.slottedElements = this.querySelectorAll('.grid-item, .grid-header');
  }

  toggleColumn(event) {
    const isChecked = event.target.checked;

    this.slottedElements.forEach(elem => {
      if (elem.classList.contains('column-a')) {
        elem.classList.toggle('hidden', isChecked);
      } else if (elem.classList.contains('column-b')) {
        elem.classList.toggle('hidden', !isChecked);
      }
    });
  }
}