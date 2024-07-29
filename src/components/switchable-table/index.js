import indexHtml from './index.html'
import styleCss from './style.css'

export class SwitchableTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = indexHtml;

    const stylesheet = new CSSStyleSheet();
    stylesheet.replaceSync(styleCss);
    this.shadowRoot.adoptedStyleSheets.push(stylesheet);

    this.shadowRoot
      .querySelector('slot[name=content]')
      .addEventListener('slotchange', this.updateSlottedElements.bind(this));

    this.shadowRoot
      .querySelector('input[type="checkbox"]')
      .addEventListener('change', this.toggleColumn.bind(this));
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

    // Save grid children reference to switch columns later
    this.gridChildren = Array.from(gridContainer.children);

    // Set column-b hidden by default
    this.gridChildren.forEach(elem => {
      if (elem.classList.contains('column-b')) {
        elem.classList.add('hidden');
      }
    });
  }

  toggleColumn(event) {
    const isChecked = event.target.checked;

    this.gridChildren.forEach(elem => {
      if (elem.classList.contains('column-a')) {
        elem.classList.toggle('hidden', isChecked);
      } else if (elem.classList.contains('column-b')) {
        elem.classList.toggle('hidden', !isChecked);
      }
    });
  }
}