import { buildForecastURL, fetchData } from './utils/apiAccess.js';
import {
  getCurrentDateString,
  constructQueryDate,
  localizeTime,
} from './utils/dateUtils.js';
import { AppSection } from './components/AppSection.js';
import { initTides, currentTides, nextTidalEvent } from './tides.js';

// We don't destructure here because of a limitation in how Parcel interacts with .env variables
const gridString = process.env.FORECAST_GRID;

const forecastURL = buildForecastURL(gridString);
const currentTime = new Date();

// Saturate app content
const subheading = document.getElementsByTagName('h2')[0];

subheading.innerText = getCurrentDateString(currentTime);

// Define custom elements
window.customElements.define('app-section', AppSection);

// Fetch weather station data
// initTides();

// class Root extends Component {
//   constructor(props) {
//     super(props);
//     this.handleDateChange = this.handleDateChange.bind(this);
//     this.state = {
//       currentDateString: getCurrentDateString(currentTime),
//       loaded: false,
//       predictionsToday: [],
//       nextEvent: {},
//       pickedDate: '',
//       futureLoaded: false,
//       predictionsFuture: [],
//       weather: {},
//     };
//   }

//   componentDidMount() {
//     fetchData(forecastURL, 'weather forcast').then(({ properties }) => {
//       console.log('Weather data received.');
//       this.setState({
//         weather: properties.periods[0],
//         loaded: true,
//       });
//       console.log('Weather state updated.');
//     });
//   }

//   handleDateChange(pickedDate) {
//     const queryDate = constructQueryDate(pickedDate, false);
//     const updatedURL = buildTideURL(baseTideUrl, stationId, queryDate, queryDate);
//     console.log('Date updated.');
//     fetchData(updatedURL, 'tide').then(({ predictions }) => {
//       console.log(`Updated date's tide data received.`);
//       this.setState({
//         predictionsFuture: predictions,
//         pickedDate: getCurrentDateString(pickedDate),
//         futureLoaded: true,
//       });
//       console.log('State updated.');
//     });
//   }

// render() {
//   const { loaded, currentDateString, predictionsToday, nextEvent, weather } =
//     this.state;
//   const nextTime = nextEvent.t;
//   const {
//     detailedForecast,
//     shortForecast,
//     temperature,
//     windSpeed,
//     windDirection,
//   } = weather;
//   // return (
//   //   <div className={`wrapper${loaded ? ' show' : ''}`}>
//   //     <h1>Weather Station</h1>
//   //     <p>{currentDateString}</p>
//   //     <ol>
//   //       {truncatePredictions(currentTime, predictionsToday, nextTime).map(
//   //         ({ type, t }) => {
//   //           const isNext = checkNext(type, t, nextEvent);
//   //           return (
//   //             <li key={`${type}${t}`} className={isNext ? 'isNext' : ''}>
//   //               {hilo[type]} {localizeTime(t)}
//   //             </li>
//   //           );
//   //         }
//   //       )}
//   //     </ol>
//   //     <p>{temperature}&deg;F</p>
//   //     <p>
//   //       {windSpeed}, {windDirection}
//   //     </p>
//   //     <p>{shortForecast}</p>
//   //     <p>{detailedForecast}</p>
//   //   </div>
//   // );
// }
// }
