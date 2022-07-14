import { useEffect, useState } from 'react';
import {
  buildForecastURL,
  buildTideURL,
  fetchData,
} from '../src/utils/apiAccess.js';
import {
  getCurrentDateString,
  constructQueryDate,
  localizeTime,
} from '../src/utils/dateUtils.js';
import { AppSection } from '../src/components';
import { initTides } from '../src/tides.js';

// We don't destructure here because of a limitation in how Parcel interacts with .env variables
const weatherGrid = process.env.NEXT_PUBLIC_FORECAST_GRID;
const tideBaseUrl = process.env.NEXT_PUBLIC_BASE_TIDE_URL;
const tideStationId = process.env.NEXT_PUBLIC_STATION_ID;

const currentTime = new Date();

// Tides
const tidalCutoff = new Date().setHours(18, 47, 30);
const isAfterCutoff = currentTime >= tidalCutoff;
const startDate = constructQueryDate(currentTime, false);
const endDate = constructQueryDate(currentTime, isAfterCutoff);
const tideURL = buildTideURL(tideBaseUrl, tideStationId, startDate, endDate);

// Weather
const forecastURL = buildForecastURL(weatherGrid);

function Root() {
  const [loaded, setLoaded] = useState(false);
  const [currentDateString] = useState(getCurrentDateString(currentTime));
  const [tidesToday, setTidesToday] = useState([]);

  useEffect(() => {
    initTides(tideURL, setTidesToday);
  }, []);

  return (
    <div className={`wrapper${loaded ? ' show' : ''}`}>
      <h1>Weather Station</h1>
      <p>{currentDateString}</p>
      {/* <p>{temperature}&deg;F</p>
      <p>
        {windSpeed}, {windDirection}
      </p>
      <p>{shortForecast}</p>
      <p>{detailedForecast}</p> */}

      {/* {sections.map(string => {
        return <AppSection key={string} section={string} />;
      })} */}
      <AppSection key={'Tides'} heading={'Tides'}>
        {JSON.stringify(tidesToday)}
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
      </AppSection>
    </div>
  );
}

export default Root;
