import { useEffect, useState } from 'react';
import { buildForecastURL, fetchData } from '../utils/apiAccess.js';

const gridString = process.env.FORECAST_GRID;
const url = buildForecastURL(gridString);

// const weatherItems = [
//   detailedForecast,
//   shortForecast,
//   temperature,
//   windSpeed,
//   windDirection,
// ];

const initWeather = async (url, currentTime, setWeather) => {
  try {
    const currentWeather = await fetchData(url, 'current weather');
    setWeather(currentWeather);
  } catch (e) {
    console.error(`Fetch request for weather data failed: ${e}`);
    return {};
  }
};

export const CurrentWeather = ({ currentTime }) => {
  // const {
  //   detailedForecast,
  //   shortForecast,
  //   temperature,
  //   windSpeed,
  //   windDirection,
  // } = weather;

  // const [temp, setTemp] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    initWeather(url, currentTime, setWeather);
  }, []);

  return (
    <section>
      <h2>Weather</h2>
      <p>{weather.temperature}&deg;F</p>
    </section>
  );
};
