const template = document.createElement('template');
template.innerHTML = `
  <style>
    * {
      color: magenta;
    }
  </style>
  <h1>Hey, what's up?</h1>
`;

class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h1').innerText = this.getAttribute('text');
  }
}

window.customElements.define('app-root', AppRoot);
