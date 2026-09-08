import React from 'react';
import PropTypes from 'prop-types';

const DeprecationBanner = ({ children }) => (
  <div role="alert" className="banner">
    {children}
  </div>
);

DeprecationBanner.propTypes = {
  children: PropTypes.node,
};

DeprecationBanner.defaultProps = {
  children:
    'This site is deprecated and will no longer be maintained or updated.',
};

export default DeprecationBanner;
