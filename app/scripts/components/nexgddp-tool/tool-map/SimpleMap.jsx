import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'lib/leaflet-singleclick';
import { connect } from 'react-redux';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
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

class SimpleMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addMarker = this.addMarker.bind(this);
  }

  onViewportChanged({ zoom, center }) {
    if (zoom !== this.props.map.zoom) this.props.setMapZoom(zoom);
    if (center[0] !== this.props.map.center[0]
      || center[1] !== this.props.map.center[1]) {
      this.props.setMapCenter(center);
    }
  }

  addMarker({ latlng }) {
    this.props.setMarkerPosition([latlng.lat, latlng.lng]);
  }

  render() {
    const { map, marker, layers, range1Selection } = this.props;
    const currentLayer = layers[0];

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: map.center || mapDefaultOptions.center,
      zoom: map.zoom || mapDefaultOptions.zoom
    });

    return (
      <div className="c-tool-map">
        {currentLayer &&
          <div className="current-layer-label">
            {range1Selection.label}
          </div>
        }

        <Map
          style={{ height: 440 }}
          {...mapOptions}
          onSingleclick={this.addMarker}
          onViewportChanged={(...params) => this.onViewportChanged(...params)}
        >
          <TileLayer
            url={config.basemapTileUrl}
          />

          {currentLayer && <TileLayer url={currentLayer.url} />}
          {marker && <Marker position={marker} icon={L.divIcon({ className: 'map-marker' })} /> }

          <ZoomControl position="bottomright" />
        </Map>
      </div>
    );
  }
}

SimpleMap.propTypes = {
  map: PropTypes.shape({
    zoom: PropTypes.number,
    center: PropTypes.array
  }),
  marker: PropTypes.array,
  layers: PropTypes.array,
  range1Selection: PropTypes.object,
  setMarkerPosition: PropTypes.func,
  setMapZoom: PropTypes.func,
  setMapCenter: PropTypes.func
};

const mapStateToProps = state => ({
  map: state.nexgddptool.map,
  marker: state.nexgddptool.marker,
  layers: getLayers(state),
  range1Selection: state.nexgddptool.range1.selection
});

const mapDispatchToProps = dispatch => ({
  setMarkerPosition: (...params) => dispatch(setMarkerPosition(...params)),
  setMapZoom: (...params) => dispatch(setMapZoom(...params)),
  setMapCenter: (...params) => dispatch(setMapCenter(...params))
});


export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);
