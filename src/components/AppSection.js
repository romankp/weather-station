import PropTypes from 'prop-types';

export const AppSection = ({ heading, children }) => {
  return (
    <section>
      <h2>{heading}</h2>
      {children}
    </section>
  );
};

AppSection.propTypes = {
  heading: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
