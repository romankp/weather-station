import { useEffect, useState } from 'react';
import { constructQueryDate, localizeTime } from '../utils/dateUtils.js';
import { buildTideURL, fetchData } from '../utils/apiAccess.js';

const tideBaseUrl = process.env.NEXT_PUBLIC_BASE_TIDE_URL;
const tideStationId = process.env.NEXT_PUBLIC_STATION_ID;

const hilo = {
  H: 'high',
  L: 'low',
};

// If it's after the tidal cutoff time,
// return an array of prediction items for todays date
// AND the first item for tomorrow's date.
const truncatePredictions = (
  isAfterCutoff,
  currentTime,
  predictions,
  nextTime
) => {
  if (isAfterCutoff && predictions.length) {
    const currentDay = currentTime.getDate();
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

const initTides = async (
  url,
  isAfterCutoff,
  currentTime,
  setNext,
  setTides
) => {
  console.log(currentTime);
  try {
    const { predictions } = await fetchData(url, 'tide');
    const nextTidalEvent = returnNextEvent(predictions);
    const adjustedTides = truncatePredictions(
      isAfterCutoff,
      currentTime,
      predictions,
      nextTidalEvent.t
    );
    setNext(nextTidalEvent);
    setTides(adjustedTides);
  } catch (e) {
    console.error(`Fetch request for tide data failed: ${e}`);
    return [];
  }
};

const returnNextEvent = (predictions, currentTime) => {
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

const checkNext = (thisType, thisTime, nextEvent) => {
  if (thisType === nextEvent.type && thisTime === nextEvent.t) {
    return true;
  }
  return false;
};

export const Tides = ({ currentTime }) => {
  const tidalCutoff = new Date().setHours(18, 47, 30);
  const isAfterCutoff = currentTime >= tidalCutoff;
  const startDate = constructQueryDate(currentTime, false);
  const endDate = constructQueryDate(currentTime, isAfterCutoff);
  const tideURL = buildTideURL(tideBaseUrl, tideStationId, startDate, endDate);

  const [nextEvent, setNextEvent] = useState({});
  const [tidesToday, setTidesToday] = useState([]);

  useEffect(() => {
    initTides(tideURL, isAfterCutoff, currentTime, setNextEvent, setTidesToday);
  }, []);

  return (
    <section>
      <h2>Tides</h2>
      <ol>
        {tidesToday.map(({ type, t }) => {
          const isNext = checkNext(type, t, nextEvent);
          return (
            <li key={`${type}${t}`} className={isNext ? 'isNext' : ''}>
              {hilo[type]} {localizeTime(t)}
            </li>
          );
        })}
      </ol>
    </section>
  );
};
