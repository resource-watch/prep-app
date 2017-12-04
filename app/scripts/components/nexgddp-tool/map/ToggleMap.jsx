import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';

class ToggleMap extends React.PureComponent {
  render() {
    const { mapOptions } = this.props;

    return (
      <Map
        style={{ height: 440 }}
        {...mapOptions}
      >
        <TileLayer
          url="//stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
        <ZoomControl position="bottomright" />
      </Map>
    );
  }
}

ToggleMap.propTypes = {
  mapOptions: PropTypes.object
};

ToggleMap.defaultProps = {
  mapOptions: {
    center: [0, 0],
    zoom: 3,
    scrollWheelZoom: false,
    attributionControl: false,
    zoomControl: false
  }
};

export default ToggleMap;
