import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import 'lib/leaflet-singleclick';

// Redux
import { getLayers } from 'selectors/nexgddptool';
import { setMarkerPosition, setMapZoom, setMapCenter } from 'actions/nexgddptool';

const mapDefaultOptions = {
  center: [20, -30],
  zoom: 3,
  minZoom: 3,
  maxZoom: 5,
  scrollWheelZoom: false,
  attributionControl: false,
  zoomControl: false
};

class DifferenceMap extends React.PureComponent {
  onViewportChanged({ zoom, center }) {
    if (zoom !== this.props.map.zoom) this.props.setMapZoom(zoom);
    if (center[0] !== this.props.map.center[0]
      || center[1] !== this.props.map.center[1]) {
      this.props.setMapCenter(center);
    }
  }

  render() {
    const { map, marker, layers } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: map.center || mapDefaultOptions.center,
      zoom: map.zoom || mapDefaultOptions.zoom
    });

    const currentLayer = layers.length ? layers[0] : null;

    return (
      <div className="c-tool-map">
        <Map
          style={{ height: 440 }}
          {...mapOptions}
          onSingleclick={({ latlng }) => this.props.setMarkerPosition([latlng.lat, latlng.lng])}
          onViewportChanged={(...params) => this.onViewportChanged(...params)}
        >
          <TileLayer url={config.basemapTileUrl} />
          {currentLayer && <TileLayer url={currentLayer.url} />}
          <ZoomControl position="bottomright" />
          { marker && <Marker position={marker} icon={L.divIcon({ className: 'map-marker' })} /> }
        </Map>
      </div>
    );
  }
}

DifferenceMap.propTypes = {
  map: PropTypes.shape({
    zoom: PropTypes.number,
    center: PropTypes.array
  }),
  marker: PropTypes.array,
  setMarkerPosition: PropTypes.func,
  setMapZoom: PropTypes.func,
  setMapCenter: PropTypes.func,
  layers: PropTypes.array
};

const mapStateToProps = state => ({
  map: state.nexgddptool.map,
  marker: state.nexgddptool.marker,
  layers: getLayers(state)
});

const mapDispatchToProps = dispatch => ({
  setMarkerPosition: (...params) => dispatch(setMarkerPosition(...params)),
  setMapZoom: (...params) => dispatch(setMapZoom(...params)),
  setMapCenter: (...params) => dispatch(setMapCenter(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(DifferenceMap);
