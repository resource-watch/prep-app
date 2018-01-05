import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import 'lib/leaflet-side-by-side';

// Redux
import { getLayers } from 'selectors/nexgddptool';
import { setMarkerPosition, setMapZoom, setMapCenter } from 'actions/nexgddptool';

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
    const { layers } = this.props;
    const map = this.mapElement.leafletElement;
    const leftLayer = L.tileLayer(layers[0].url, {
      maxZoom: 10,
      minZoom: 3
    });

    const rightLayer = L.tileLayer(layers[1].url, {
      minZoom: 3,
      maxZoom: 10
    });

    window.requestAnimationFrame(() => {
      this.sideBySideControl = L.control.sideBySide();
      this.sideBySideControl.addTo(map);

      // Add layers
      leftLayer.addTo(map);
      rightLayer.addTo(map);

      this.sideBySideControl
        .setLeftLayers(leftLayer)
        .setRightLayers(rightLayer);

      map.invalidateSize();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { layers: nextLayers } = nextProps;
    const { layers: currentLayers } = this.props;

    const hasChanged = nextLayers.some((l, i) => l.url !== (currentLayers[i] || {}).url);

    if (hasChanged) {
      // Not sure about this...
      const map = this.mapElement.leafletElement;
      const leftLayer = L.tileLayer(nextLayers[0].url, {
        maxZoom: 10,
        minZoom: 3
      });

      const rightLayer = L.tileLayer(nextLayers[1].url, {
        minZoom: 3,
        maxZoom: 10
      });

      window.requestAnimationFrame(() => {
        // Add layers
        leftLayer.addTo(map);
        rightLayer.addTo(map);

        this.sideBySideControl
          .setLeftLayers(leftLayer)
          .setRightLayers(rightLayer);

        map.invalidateSize();
      });
    }
  }

  onViewportChanged({ zoom, center }) {
    if (zoom !== this.props.map.zoom) this.props.setMapZoom(zoom);
    if (center[0] !== this.props.map.center[0]
      || center[1] !== this.props.map.center[1]) {
      this.props.setMapCenter(center);
    }
  }

  render() {
    const { map, marker, range1Selection, range2Selection } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: map.center || mapDefaultOptions.center,
      zoom: map.zoom || mapDefaultOptions.zoom
    });

    return (
      <div className="c-tool-map">
        <div
          className="current-layer-label"
        >{range1Selection.label}</div>
        <div
          className="current-layer-label -right"
        >{range2Selection.label}</div>
        <Map
          ref={(el) => { this.mapElement = el; }}
          style={{ height: 440 }}
          {...mapOptions}
          onClick={({ latlng }) => this.props.setMarkerPosition([latlng.lat, latlng.lng])}
          onViewportChanged={(...params) => this.onViewportChanged(...params)}
        >
          <TileLayer
            url={config.basemapTileUrl}
          />
          <ZoomControl position="bottomright" />
          { marker && <Marker position={marker} icon={L.divIcon({ className: 'map-marker' })} /> }
        </Map>
      </div>
    );
  }
}

CompareMap.propTypes = {
  map: PropTypes.shape({
    zoom: PropTypes.number,
    center: PropTypes.array
  }),
  layers: PropTypes.array,
  marker: PropTypes.array,
  range1Selection: PropTypes.object,
  range2Selection: PropTypes.object,
  setMarkerPosition: PropTypes.func,
  setMapZoom: PropTypes.func,
  setMapCenter: PropTypes.func
};

const mapStateToProps = state => ({
  map: state.nexgddptool.map,
  marker: state.nexgddptool.marker,
  layers: getLayers(state),
  range1Selection: state.nexgddptool.range1.selection,
  range2Selection: state.nexgddptool.range2.selection
});

const mapDispatchToProps = dispatch => ({
  setMarkerPosition: (...params) => dispatch(setMarkerPosition(...params)),
  setMapZoom: (...params) => dispatch(setMapZoom(...params)),
  setMapCenter: (...params) => dispatch(setMapCenter(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompareMap);
