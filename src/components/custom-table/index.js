import indexHtml from './index.html'
import styleCss from './style.css'

/**
 * Custom table component. Takes a `columns` attribute to define the number of columns.
 * The `grid-header` and `grid-item` classes are used to define the header and content cells.
 * @example
 * ```
 * <custom-table columns="3">
 *  <h1 slot="header">Header 1</h1>
 *  <span slot="content">
 *   <div class="grid-header">Header 1</div>
 *   <div class="grid-header">Header 2</div>
 *   <div class="grid-item">Item 1</div>
 *   <div class="grid-item">Item 2</div>
 *  </span>
 * </custom-table>
 * ```
 */
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

  /**
   * Move slotted elements from the content slot to the grid container.
   */
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