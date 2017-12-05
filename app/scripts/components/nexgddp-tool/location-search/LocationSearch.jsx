import React from 'react';
import PropTypes from 'prop-types';
import Geosuggest from 'react-geosuggest';
import './style.scss';

const LocationSearch = (props) => (
  <div className="c-location-search">
    <Geosuggest onSuggestSelect={props.onChange} />
  </div>
);

LocationSearch.propTypes = {
  onChange: PropTypes.func
};

export default LocationSearch;
