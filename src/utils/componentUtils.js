const buildFullURL = (baseUrl, stationId, startDate, endDate) => {
  return `${baseUrl}?station=${stationId}&datum=STND&time_zone=lst&begin_date=${startDate}&end_date=${endDate}&units=english&format=json&product=predictions&interval=hilo`;
};

export { buildFullURL };
