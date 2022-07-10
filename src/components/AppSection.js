import {
  initTides,
  checkNext,
  currentTides,
  nextTidalEvent,
} from '../tides.js';

const subHeadings = {
  current: 'Current Weather',
  tides: 'Tides',
  wind: 'Wind',
};

export const AppSection = ({ section }) => {
  return (
    <section>
      <h2>{subHeadings[section]}</h2>
    </section>
  );
};

// export class AppSection extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//     this.shadowRoot.appendChild(template.content.cloneNode(true));

//     this.type = this.getAttribute('type');

//     // Dynamic content
//     this.shadowRoot.querySelector('h3').innerText = subHeadings[this.type];

//     if (this.type === 'tides') {
//       initTides().then(tidesArray => {
//         const childOL = document.createElement('ol');

//         tidesArray.forEach(({ t, type }) => {
//           const tideItem = document.createElement('li');
//           const isNext = checkNext(type, t, nextTidalEvent);

//           console.log(isNext);

//           tideItem.innerText = `${t} ${type}${isNext ? ' NEXT EVENT' : ''}`;

//           childOL.appendChild(tideItem);
//         });

//         this.shadowRoot.appendChild(childOL);
//       });
//     }
//   }
// }
