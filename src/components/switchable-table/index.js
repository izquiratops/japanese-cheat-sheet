import indexHtml from './index.html'
import styleCss from './style.css'
import tooltipCss from '../../tooltip.css'
/**
 * Table with a switch to toggle columns visibility.
 * The `column-a` and `column-b` classes are used to define the columns that can be toggled.
 * The `grid-header` and `grid-item` classes are used to define the header and content cells.
 * @example
 * ```
 * <switchable-table>
 *  <h1 slot="header">Header 1</h1>
 *  <span slot="content">
 *    <div class="grid-header column-a">Header 1</div>
 *    <div class="grid-header column-b">Header 2</div>
 *    <div class="grid-item column-a">Item 1</div>
 *    <div class="grid-item column-b">Item 2</div>
 *  </span>
 * </switchable-table>
 * ```
 */
export class SwitchableTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = indexHtml;

    [styleCss, tooltipCss].forEach(css => {
      const stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(css);
      this.shadowRoot.adoptedStyleSheets.push(stylesheet);
    });

    this.shadowRoot
      .querySelector('slot[name=content]')
      .addEventListener('slotchange', this.updateSlottedElements.bind(this));

    this.shadowRoot
      .querySelector('input[type="checkbox"]')
      .addEventListener('change', this.toggleColumn.bind(this));
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

    // Save grid children reference to switch columns later
    this.gridChildren = Array.from(gridContainer.children);

    // Set column-b hidden by default
    this.gridChildren.forEach(elem => {
      if (elem.classList.contains('column-b')) {
        elem.classList.add('hidden');
      }
    });
  }

  /**
   * Switch columns visibility based on checkbox state
   * @param {Event} event Checkbox change event
   */
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