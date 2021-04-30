import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Geosuggest from 'react-geosuggest';

// styles
import './location-search-styles.scss';

const LocationSearchComponent = (props) => {
  const {
    setBBox,
    setMapParams,
    onSearch
  } = props;

  const handleSuggest = useCallback((e) => {
    const { gmaps, location } = e;

    const viewport = gmaps.geometry && gmaps.geometry.viewport;

    if (viewport) {
      const { south, west, north, east } = viewport.toJSON();
      setBBox([
        east, north,
        west, south,
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
  });

  return (
    <Geosuggest
      onSuggestSelect={handleSuggest}
      className="-explore"
    />
  );
};

LocationSearchComponent.propTypes = {
  setMapParams: PropTypes.func.isRequired,
  setBBox: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default LocationSearchComponent;
