import PropTypes from 'prop-types';

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

AppSection.propTypes = {
  section: PropTypes.string,
};
