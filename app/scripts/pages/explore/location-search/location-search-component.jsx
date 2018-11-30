import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Geosuggest from 'react-geosuggest';

// styles
import './location-search-styles.scss';

class LocationSearchComponent extends PureComponent {
  propTypes = {
    setMapParams: PropTypes.func.isRequired,
    setBBox: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
  }

  onSuggestSelect = (e) => {
    const {
      setBBox,
      setMapParams,
      onSearch
    } = this.props;
    const { gmaps, location } = e;

    const viewport = gmaps.geometry && gmaps.geometry.viewport;

    if (viewport) {
      setBBox([
        viewport.j.j, viewport.l.j,
        viewport.j.l, viewport.l.l
      ]);
    }

    if (!viewport && location) {
      setMapParams({
        lat: location.lat,
        lng: location.lng,
        zoom: 7
      });
    }

    onSearch(false);
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

export default LocationSearchComponent;
