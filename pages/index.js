import { useEffect, useState } from 'react';
import { buildForecastURL, fetchData } from '../src/utils/apiAccess.js';
import {
  getCurrentDateString,
  constructQueryDate,
  localizeTime,
} from '../src/utils/dateUtils.js';
import { AppSection, Tides } from '../src/components';

const weatherGrid = process.env.NEXT_PUBLIC_FORECAST_GRID;

let currentTime = new Date();

// Weather
const forecastURL = buildForecastURL(weatherGrid);

function Root() {
  const [loaded, setLoaded] = useState(false);
  const [currentDateString] = useState(getCurrentDateString(currentTime));

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

      <AppSection
        key={'Current Weather'}
        heading={'Current Weather'}
      ></AppSection>
      <AppSection key={'Wind'} heading={'Wind'}></AppSection>
      <Tides currentTime={currentTime}></Tides>
    </div>
  );
}

export default Root;
