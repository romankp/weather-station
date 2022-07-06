import { buildForecastURL, fetchData } from '../src/utils/apiAccess.js';
import {
  getCurrentDateString,
  constructQueryDate,
  localizeTime,
} from '../src/utils/dateUtils.js';
// import { AppSection } from '../src/components/AppSection.js';

// We don't destructure here because of a limitation in how Parcel interacts with .env variables
// const gridString = process.env.FORECAST_GRID;

// const forecastURL = buildForecastURL(gridString);
const currentTime = new Date();

function App() {
  return (
    <>
      <h1>Weather Station</h1>
      <h2>{getCurrentDateString(currentTime)}</h2>
      <app-section type="current">
        <h4 slot="section-content">
          HEADER TEST <span>Wow! So span!</span>
        </h4>
      </app-section>
      <app-section type="tides"></app-section>
      <app-section type="wind"></app-section>
    </>
  );
}

export default App;
