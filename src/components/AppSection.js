const subHeadings = {
  current: 'Current Weather',
  tides: 'Tides',
  wind: 'Wind',
};

export const AppSection = ({ section }) => {
  return (
    <section>
      <h2>{subHeadings[section]}</h2>
    </section>
  );
};
