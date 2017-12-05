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

class DifferenceMap extends React.PureComponent {
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
            url={config.basemapTileUrl}
          />
          <ZoomControl position="bottomright" />
          { markerLocation && <Marker position={markerLocation} /> }
        </Map>
      </div>
    );
  }
}

DifferenceMap.propTypes = {
  markerLocation: PropTypes.object
};

export default DifferenceMap;
