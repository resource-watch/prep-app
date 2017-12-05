import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import 'lib/leaflet-side-by-side';

const mapDefaultOptions = {
  center: [20, -30],
  zoom: 3,
  minZoom: 3,
  maxZoom: 10,
  scrollWheelZoom: false,
  attributionControl: false,
  zoomControl: false
};

class CompareMap extends React.PureComponent {
  componentDidMount() {
    const map = this.mapElement.leafletElement;
    const leftLayer = L.tileLayer(`${config.apiUrlRW}/layer/dd272bc7-a5e7-41e2-8ca5-6e3353603fd0/tile/rasdaman/{z}/{x}/{y}?ansi="1960-01-01T00:00:00"`, {
      maxZoom: 10,
      minZoom: 3
    });

    const rightLayer = L.tileLayer(`${config.apiUrlRW}/layer/dd272bc7-a5e7-41e2-8ca5-6e3353603fd0/tile/rasdaman/{z}/{x}/{y}?ansi="2050-01-01T00:00:00"`, {
      minZoom: 3,
      maxZoom: 10
    });

    window.requestAnimationFrame(() => {
      leftLayer.addTo(map);
      rightLayer.addTo(map);
      L.control.sideBySide(leftLayer, rightLayer).addTo(map);
      map.invalidateSize();
    });
  }

  render() {
    const { marker } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: marker || mapDefaultOptions.center
    });

    return (
      <div className="c-tool-map">
        <Map
          ref={el => (this.mapElement = el)}
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

CompareMap.propTypes = {
  marker: PropTypes.array
};

const mapStateToProps = state => ({
  marker: state.nexgddptool.marker
});

export default connect(mapStateToProps)(CompareMap);
