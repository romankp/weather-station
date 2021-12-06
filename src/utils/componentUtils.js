const buildFullURL = (baseUrl, stationId, startDate, endDate) => {
  return `${baseUrl}?station=${stationId}&datum=STND&time_zone=lst&begin_date=${startDate}&end_date=${endDate}&units=english&format=json&product=predictions&interval=hilo`;
};

const getCurrentDateString = date => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'est',
  });
};

const constructQueryDate = (date, isTomorrow) => {
  const workingDate = new Date(date);
  if (isTomorrow) {
    workingDate.setDate(workingDate.getDate() + 1);
  }
  return returnQueryDateString(workingDate);
};

const returnQueryDateString = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}${month < 10 ? `0${month}` : month}${
    day < 10 ? `0${day}` : day
  }`;
};

const localizeTime = time => {
  const timeString = new Date(time);
  const localizedTime = timeString.toLocaleTimeString('en-US', {
    timeStyle: 'short',
  });
  return localizedTime;
};

export { buildFullURL, getCurrentDateString, constructQueryDate, localizeTime };
