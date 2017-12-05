import React from 'react';
import PropTypes from 'prop-types';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';

const mapDefaultOptions = {
  center: [20, -30],
  zoom: 3,
  scrollWheelZoom: false,
  attributionControl: false,
  zoomControl: false
};

class ToggleMap extends React.PureComponent {
  render() {
    const { markerLocation } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: markerLocation || mapDefaultOptions.center
    });

    return (
      <div className="c-tool-map">
        <Map
          style={{ height: 440 }}
          {...mapOptions}
        >
          <TileLayer
            url="//stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <ZoomControl position="bottomright" />
          { markerLocation && <Marker position={markerLocation} /> }
        </Map>
      </div>
    );
  }
}

ToggleMap.propTypes = {
  mapOptions: PropTypes.object,
  markerLocation: PropTypes.object
};

export default ToggleMap;
