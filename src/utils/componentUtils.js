const buildFullURL = (baseUrl, stationId, startDate, endDate) => {
  return `${baseUrl}?station=${stationId}&datum=STND&time_zone=lst&begin_date=${startDate}&end_date=${endDate}&units=english&format=json&product=predictions&interval=hilo`;
};

const buildFullForecastURL = gridString => {
  return `https://api.weather.gov/gridpoints/BOX/${gridString}/forecast`;
};

export { buildFullURL, buildFullForecastURL };
