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
  <slot name="section-content">Loading data</slot>
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
      const testArray = ['1', '2', '3'];
      const childOL = document.createElement('ol');

      testArray.forEach(item => {
        const tideItem = document.createElement('li');
        tideItem.innerText = item;

        childOL.appendChild(tideItem);
      });

      this.shadowRoot.appendChild(childOL);
    }
  }
}
