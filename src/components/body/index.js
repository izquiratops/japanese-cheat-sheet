import componentHtml from './index.html';

export class Body extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = componentHtml;

    addEventListener("load", this.onLoad);
  }

  onLoad = () => {
    document
      .getElementById('scroll-to-top')
      .addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }
}