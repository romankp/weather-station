import { fetchData } from './utils/apiAccess.js';

const currentTime = new Date();
const tidalCutoff = new Date().setHours(18, 47, 30);
const isAfterCutoff = currentTime >= tidalCutoff;

// Tidal event state
let currentTides;
let truncatedTides;
let nextTidalEvent;

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

const initTides = async (url, updateState) => {
  try {
    const { predictions } = await fetchData(url, 'tide');

    console.log('Tide data received');
    currentTides = predictions;
    nextTidalEvent = returnNextEvent(predictions);
    truncatedTides = truncatePredictions(
      currentTime,
      currentTides,
      nextTidalEvent.t
    );
    updateState(truncatedTides);
    console.log('Tide state updated');
  } catch (e) {
    console.error(`Fetch request for tide data failed: ${e}`);
    return [];
  }
};

export { initTides, checkNext, hilo };
