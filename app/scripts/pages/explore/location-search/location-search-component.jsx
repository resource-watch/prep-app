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
    const { gmaps, location } = e;

    const viewport = gmaps.geometry && gmaps.geometry.viewport;

    if (viewport) {
      this.props.setBBox([
        viewport.b.b, viewport.f.b,
        viewport.b.f, viewport.f.f
      ]);
    }

    if (!viewport && location) {
      this.props.setMapParams({
        lat: location.lat,
        lng: location.lng,
        zoom: 7
      });
    }    

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

LocationSearchComponent.propTypes = { setMapParams: PropTypes.func, setBBox: PropTypes.func };

export default LocationSearchComponent;
