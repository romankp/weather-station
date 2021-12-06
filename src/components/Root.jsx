import React, { Component } from 'react';
import {
  getCurrentDateString,
  constructQueryDate,
  buildFullURL,
} from '../utils/componentUtils.js';

// We don't destructure here because of a limitation in how Parcel interacts with .env variables
const baseUrl = process.env.BASE_URL;
const stationId = process.env.STATION_ID;

class Root extends Component {
  constructor() {
    super();
  }

  render() {
    return <h1>Let's try this again!</h1>;
  }
}

export default Root;
