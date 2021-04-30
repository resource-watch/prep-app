import React from 'react';
import PropTypes from 'prop-types';

import 'styles/index.scss';

function PrepApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

PrepApp.propTypes = {
  Component: PropTypes.node,
  pageProps: PropTypes.shape({}),
};

export default PrepApp;
