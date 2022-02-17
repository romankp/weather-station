const buildTideURL = (baseUrl, stationId, startDate, endDate) => {
  return `${baseUrl}?station=${stationId}&datum=STND&time_zone=lst&begin_date=${startDate}&end_date=${endDate}&units=english&format=json&product=predictions&interval=hilo`;
};

const buildForecastURL = gridString => {
  return `https://api.weather.gov/gridpoints/BOX/${gridString}/forecast`;
};

const fetchData = async (url, type) => {
  console.log(`Fetching ${type} data.`);
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.error(`Fetch request for ${type} data failed: ${e}`);
  }
};

export { buildTideURL, buildForecastURL, fetchData };
