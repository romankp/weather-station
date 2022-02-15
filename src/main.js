import {
  buildFullURL,
  buildFullForecastURL,
  fetchData,
} from './utils/apiAccess.js';
import {
  getCurrentDateString,
  constructQueryDate,
  localizeTime,
} from './utils/dateUtils.js';
import { AppSection } from './components/AppSection.js';

// We don't destructure here because of a limitation in how Parcel interacts with .env variables
const baseUrl = process.env.BASE_URL;
const stationId = process.env.STATION_ID;
const gridString = process.env.FORECAST_GRID;

const currentTime = new Date();
const tidalCutoff = new Date().setHours(18, 47, 30);
const isAfterCutoff = currentTime >= tidalCutoff;
const startDate = constructQueryDate(currentTime, false);
const endDate = constructQueryDate(currentTime, isAfterCutoff);
const urlFull = buildFullURL(baseUrl, stationId, startDate, endDate);
const forecastURL = buildFullForecastURL(gridString);

// If it's after the tidal cutoff time,
// return an array of prediction items for todays date
// AND the first item for tomorrow's date.
const truncatePredictions = (current, predictions, nextTime) => {
  if (isAfterCutoff && predictions.length) {
    const currentDay = current.getDate();
    // Truncate predictions to today's date
    const truncatedArray = predictions.filter(({ t }) => {
      const itemDay = new Date(t).getDate();
      return currentDay === itemDay;
    });
    // Tomorrow's first tidal event
    const tomorrowItem = predictions.find(({ t }) => {
      const itemDay = new Date(t).getDate();
      return currentDay !== itemDay;
    });
    // If next event is tommorrow, attach tomorrow's first tidal event to predictions
    if (nextIsTomorrow(tomorrowItem.t, nextTime)) {
      truncatedArray.push(tomorrowItem);
    }
    return truncatedArray;
  }
  return predictions;
};

// Check that the next event is tomorrow,
// in case current date/time is past today's event times
const nextIsTomorrow = (tomorrowTime, nextTime) => {
  const tomorrowDay = new Date(tomorrowTime).getDate();
  // Default to 0 since getDate never returns it, while nextTime is not ready
  const nextEventDay = nextTime ? new Date(nextTime).getDate() : 0;
  return tomorrowDay === nextEventDay;
};

const returnNextEvent = predictions => {
  return (
    predictions.find(({ t }) => {
      const predictionDate = new Date(t);
      if (currentTime < predictionDate) {
        return true;
      }
      return false;
    }) || {}
  );
};

const hilo = {
  H: 'high',
  L: 'low',
};

const checkNext = (thisType, thisTime, nextEvent) => {
  if (thisType === nextEvent.type && thisTime === nextEvent.t) {
    return true;
  }
  return false;
};

// Saturate app content
const subheading = document.getElementsByTagName('h2')[0];

subheading.innerText = getCurrentDateString(currentTime);

// Define custom elements
window.customElements.define('app-section', AppSection);

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
//     fetchData(urlFull, 'tide').then(({ predictions }) => {
//       console.log('Tide data received.');
//       this.setState({
//         predictionsToday: predictions,
//         nextEvent: returnNextEvent(predictions),
//       });
//       console.log('Tide state updated.');
//     });
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
//     const updatedURL = buildFullURL(baseUrl, stationId, queryDate, queryDate);
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

// export default Root;
