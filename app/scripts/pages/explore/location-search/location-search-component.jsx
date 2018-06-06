import React from 'react';
import PropTypes from 'prop-types';
import Geosuggest from 'react-geosuggest';
import isEqual from 'lodash/isEqual';

import './location-search-styles.scss';

class LocationSearchComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onSuggestSelect = this.onSuggestSelect.bind(this);
  }

  onSuggestSelect(e) {
    if (!e || !e.location) return;

    const { lat, lng } = e.location;

    setTimeout(() => {
      this.props.setMapParams({
        zoom: 7,
        lat,
        lng
      });
    }, 500);

    this.props.onSearch(false);
  }

  render() {
    return (
      <Geosuggest
        ref={(node) => { this.geoSuggest = node; }}
        onSuggestSelect={this.onSuggestSelect}
        className="-explore"
      />
    );
  }
}

LocationSearchComponent.propTypes = { setMapParams: PropTypes.func };

export default LocationSearchComponent;
