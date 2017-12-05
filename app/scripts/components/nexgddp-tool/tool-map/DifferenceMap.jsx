import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';

const mapDefaultOptions = {
  center: [20, -30],
  zoom: 3,
  minZoom: 3,
  maxZoom: 10,
  scrollWheelZoom: false,
  attributionControl: false,
  zoomControl: false
};

class DifferenceMap extends React.PureComponent {
  render() {
    const { marker } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: marker || mapDefaultOptions.center
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
          { marker && <Marker position={marker} /> }
        </Map>
      </div>
    );
  }
}

DifferenceMap.propTypes = {
  marker: PropTypes.array
};

const mapStateToProps = state => ({
  marker: state.nexgddptool.marker
});

export default connect(mapStateToProps)(DifferenceMap);
