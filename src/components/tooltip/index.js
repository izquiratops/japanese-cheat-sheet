import indexHtml from './index.html'
import styleCss from './style.css'

/**
 * TODO: Tooltip that renders when user hovers a targeted element
 * ```
 * <custom-tooltip>
 *   <h3>Godan & Ichidan</h3>
 *   <span slot="content">
 *     <div>Testing tooltip</div>
 *   </span>
 * </custom-tooltip>
 * ```
 */
export class Tooltip extends HTMLElement {
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

        const anchorElement = this.shadowRoot.querySelector('slot')
        anchorElement.addEventListener('mouseenter', this.renderTooltip.bind(this))
        anchorElement.addEventListener('mouseleave', this.renderTooltip.bind(this));
        anchorElement.addEventListener('click', this.renderTooltip.bind(this));
    }

    updateSlottedElements() {
        const tooltipContainer = this.shadowRoot.querySelector('#tooltip');
        const slottedElements = this.shadowRoot
            .querySelector('slot[name=content]')
            .assignedElements();

        // Clear existing content
        tooltipContainer.innerHTML = '';

        // Add slotted elements to the tooltip
        Array.from(slottedElements[0].children).forEach(child => {
            tooltipContainer.appendChild(child.cloneNode(true));
        });
    }

    renderTooltip(event) {
        const tooltipContainer = this.shadowRoot.querySelector('#tooltip');

        switch (event.type) {
            case 'mouseenter':
                tooltipContainer.classList.toggle('hidden', false);
                break;
            case 'mouseleave':
                tooltipContainer.classList.toggle('hidden', true);
                break;
            case 'click':
                tooltipContainer.classList.toggle('hidden');
                break;
            default:
                tooltipContainer.classList.toggle('hidden', true);
                break;
        }
    }
}