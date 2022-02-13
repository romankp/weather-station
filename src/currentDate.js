class CurrentDate extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<h2>${this.getAttribute('date')}</h2>`;
  }
}

window.customElements.define('app-current-date', CurrentDate);
