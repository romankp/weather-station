import { getCurrentDateString } from '../utils/dateUtils.js';

const currentTime = new Date();

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host * {
      margin: 0;
      padding: 0;
      border: none;
    }
  </style>
  <h3>Current Weather</h3>
  
`;

export class AppSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // this.shadowRoot.querySelector('h2').innerText =
    //   getCurrentDateString(currentTime);
  }
}
