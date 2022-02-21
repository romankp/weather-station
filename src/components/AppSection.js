const subHeadings = {
  current: 'Current Weather',
  tides: 'Tides',
  wind: 'Wind',
};

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host * {
      margin: 0;
      padding: 0;
      border: none;
    }
  </style>
  <h3></h3>
`;

export class AppSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.type = this.getAttribute('type');

    // Dynamic content
    this.shadowRoot.querySelector('h3').innerText = subHeadings[this.type];

    if (this.type === 'tides') {
      const childOL = document.createElement('ol');

      this.shadowRoot.appendChild(childOL);
    }
  }
}
