import { buildTideURL, fetchData } from './utils/apiAccess.js';
import {
  getCurrentDateString,
  constructQueryDate,
  localizeTime,
} from './utils/dateUtils.js';

// We don't destructure here because of a limitation in how Parcel interacts with .env variables
const baseTideUrl = process.env.BASE_TIDE_URL;
const stationId = process.env.STATION_ID;

const currentTime = new Date();
const tidalCutoff = new Date().setHours(18, 47, 30);
const isAfterCutoff = currentTime >= tidalCutoff;
const startDate = constructQueryDate(currentTime, false);
const endDate = constructQueryDate(currentTime, isAfterCutoff);
const tideURL = buildTideURL(baseTideUrl, stationId, startDate, endDate);
