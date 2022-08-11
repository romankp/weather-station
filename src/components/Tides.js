const tideBaseUrl = process.env.NEXT_PUBLIC_BASE_TIDE_URL;
const tideStationId = process.env.NEXT_PUBLIC_STATION_ID;

export const Tides = ({ currentTime }) => {
  const tidalCutoff = new Date().setHours(18, 47, 30);
  const isAfterCutoff = currentTime >= tidalCutoff;
  // const startDate = constructQueryDate(currentTime, false);
  // const endDate = constructQueryDate(currentTime, isAfterCutoff);
  // const tideURL = buildTideURL(tideBaseUrl, tideStationId, startDate, endDate);

  // const [tidesToday, setTidesToday] = useState([]);

  // useEffect(() => {
  //   initTides(tideURL, setTidesToday);
  // }, []);

  return (
    <section>
      <h2>Tides</h2>
      {/* {JSON.stringify(tidesToday)}
      {
        <ol>
          {tidesToday.map(({ type, t }) => {
            // const isNext = checkNext(type, t, nextEvent);
            return (
              // <li key={`${type}${t}`} className={isNext ? 'isNext' : ''}>
              //   {hilo[type]} {localizeTime(t)}
              // </li>

              <li key={`${type}${t}`}>
                {hilo[type]} {localizeTime(t)}
              </li>
            );
          })}
        </ol>
      } */}
    </section>
  );
};
