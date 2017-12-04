import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import { Map, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet-side-by-side/leaflet-side-by-side';

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
    const { mapOptions } = this.props;

    return (
      <Map
        ref={el => (this.mapElement = el)}
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

CompareMap.propTypes = {
  mapOptions: PropTypes.object
};

CompareMap.defaultProps = {
  mapOptions: {
    center: [0, 0],
    zoom: 3,
    scrollWheelZoom: false,
    attributionControl: false,
    zoomControl: false
  }
};

export default CompareMap;
