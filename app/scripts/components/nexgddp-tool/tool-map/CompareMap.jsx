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
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    const stamenLayer = L.tileLayer('//stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
        'Map data {attribution.OpenStreetMap}',
      minZoom: 1,
      maxZoom: 16
    });

    window.requestAnimationFrame(() => {
      osmLayer.addTo(map);
      stamenLayer.addTo(map);
      L.control.sideBySide(stamenLayer, osmLayer).addTo(map);
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
