import { useState } from 'react';
import { buildForecastURL, fetchData } from '../src/utils/apiAccess.js';
import {
  getCurrentDateString,
  constructQueryDate,
  localizeTime,
} from '../src/utils/dateUtils.js';
import { AppSection } from '../src/components';

// We don't destructure here because of a limitation in how Parcel interacts with .env variables
const gridString = process.env.NEXT_PUBLIC_FORECAST_GRID;

const forecastURL = buildForecastURL(gridString);
const currentTime = new Date();

const sections = ['current', 'wind'];

function Root() {
  const [loaded, setLoaded] = useState(false);
  const [currentDateString, setCurrentDateString] = useState(
    getCurrentDateString(currentTime)
  );
  const [predictionsToday] = useState([]);
  const [nextEvent] = useState({});

  return (
    <div className={`wrapper${loaded ? ' show' : ''}`}>
      <h1>Weather Station</h1>
      <p>{currentDateString}</p>
      {/* <ol>
        {truncatePredictions(currentTime, predictionsToday, nextTime).map(
          ({ type, t }) => {
            const isNext = checkNext(type, t, nextEvent);
            return (
              <li key={`${type}${t}`} className={isNext ? 'isNext' : ''}>
                {hilo[type]} {localizeTime(t)}
              </li>
            );
          }
        )}
      </ol> */}
      {/* <p>{temperature}&deg;F</p>
      <p>
        {windSpeed}, {windDirection}
      </p>
      <p>{shortForecast}</p>
      <p>{detailedForecast}</p> */}

      {sections.map(string => {
        return <AppSection key={string} section={string} />;
      })}
      <section>
        <h2>{Tides}</h2>
        {/* <ol>
        {truncatePredictions(currentTime, predictionsToday, nextTime).map(
          ({ type, t }) => {
            const isNext = checkNext(type, t, nextEvent);
            return (
              <li key={`${type}${t}`} className={isNext ? 'isNext' : ''}>
                {hilo[type]} {localizeTime(t)}
              </li>
            );
          }
        )}
      </ol> */}
      </section>
    </div>
  );
}

export default Root;
