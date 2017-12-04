import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';

class DifferenceMap extends React.PureComponent {
  render() {
    const { mapOptions } = this.props;

    return (
      <Map
        style={{ height: 440 }}
        {...mapOptions}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <ZoomControl position="bottomright" />
      </Map>
    );
  }
}

DifferenceMap.propTypes = {
  mapOptions: PropTypes.object
};

DifferenceMap.defaultProps = {
  mapOptions: {
    center: [0, 0],
    zoom: 3,
    scrollWheelZoom: false,
    attributionControl: false,
    zoomControl: false
  }
};

export default DifferenceMap;
