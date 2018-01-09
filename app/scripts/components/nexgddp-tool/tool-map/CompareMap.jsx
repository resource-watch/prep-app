import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import L from 'leaflet';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import 'lib/leaflet-side-by-side';
import 'lib/leaflet-singleclick';

// Redux
import { getLayers } from 'selectors/nexgddptool';
import { setMarkerPosition, setMapZoom, setMapCenter, setBasemap, setBoundaries, setLabels } from 'actions/nexgddptool';

// Components
import BasemapControl from 'components/basemap-control';
import { basemapsSpec, labelsSpec, boundariesSpec } from 'components/basemap-control/basemap-control-constants';

const mapDefaultOptions = {
  center: [20, -30],
  zoom: 3,
  minZoom: 3,
  maxZoom: 5,
  scrollWheelZoom: false,
  attributionControl: false,
  zoomControl: false
};

class CompareMap extends React.PureComponent {
  componentDidMount() {
    const { layers } = this.props;
    const map = this.mapElement.leafletElement;
    const leftLayer = L.tileLayer(layers[0].url, {
      maxZoom: 5,
      minZoom: 3
    });

    const rightLayer = L.tileLayer(layers[1].url, {
      minZoom: 3,
      maxZoom: 5
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

    // We add the static layers
    this.updateStaticLayers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { layers: nextLayers } = nextProps;
    const { layers: currentLayers } = this.props;

    const hasChangedLayers = nextLayers.some((l, i) => l.url !== (currentLayers[i] || {}).url);

    if (hasChangedLayers) {
      // Not sure about this...
      const map = this.mapElement.leafletElement;
      const leftLayer = L.tileLayer(nextLayers[0].url, {
        maxZoom: 5,
        minZoom: 3
      });

      const rightLayer = L.tileLayer(nextLayers[1].url, {
        minZoom: 3,
        maxZoom: 5
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

    if (this.props.map.labels !== nextProps.map.labels
      || this.props.map.boundaries !== nextProps.map.boundaries) {
      this.updateStaticLayers(nextProps);
    }
  }

  onClickMap({ originalEvent, latlng }) {
    // When the map divider is moved, the map receives a click event
    // "leaflet-sbs-range" is the class of the divider
    if (originalEvent.target.classList.contains('leaflet-sbs-range')) {
      return;
    }

    this.props.setMarkerPosition([latlng.lat, latlng.lng]);
  }

  onViewportChanged({ zoom, center }) {
    if (zoom !== this.props.map.zoom) this.props.setMapZoom(zoom);
    if (center[0] !== this.props.map.center[0]
      || center[1] !== this.props.map.center[1]) {
      this.props.setMapCenter(center);
    }
  }

  /**
   * Show/hide the static layers (labels and boundaries)
   * NOTE: the basemap layers is managed by the render function as
   * it doesn't need to be always on top
   * @param {object} props
   */
  updateStaticLayers(props) {
    const map = this.mapElement.leafletElement;
    const { map: mapProp } = props;

    // If the layers were previously created, we remove them
    // from the map
    if (this.boundariesLayer) map.removeLayer(this.boundariesLayer);
    if (this.labelsLayer) map.removeLayer(this.labelsLayer);

    // We re-create the layers
    this.boundariesLayer = L.tileLayer(boundariesSpec.dark.value, { zIndex: 9 });
    this.labelsLayer = L.tileLayer(labelsSpec[mapProp.labels].value, { zIndex: 10 });

    // We add them to the map
    if (mapProp.boundaries) this.boundariesLayer.addTo(map);
    if (mapProp.layers !== 'none') this.labelsLayer.addTo(map);
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
          onSingleclick={e => this.onClickMap(e)}
          onViewportChanged={(...params) => this.onViewportChanged(...params)}
        >
          <TileLayer url={basemapsSpec[map.basemap].value} />
          <ZoomControl position="bottomright" />

          { marker && <Marker position={marker} icon={L.divIcon({ className: 'map-marker' })} /> }
        </Map>

        <BasemapControl
          basemap={map.basemap}
          labels={map.labels}
          boundaries={map.boundaries}
          setBasemap={this.props.setBasemap}
          setLabels={this.props.setLabels}
          setBoundaries={this.props.setBoundaries}
        />
      </div>
    );
  }
}

CompareMap.propTypes = {
  map: PropTypes.shape({
    zoom: PropTypes.number,
    center: PropTypes.array,
    labels: PropTypes.string,
    boundaries: PropTypes.bool
  }),
  layers: PropTypes.array,
  marker: PropTypes.array,
  range1Selection: PropTypes.object,
  range2Selection: PropTypes.object,
  setMarkerPosition: PropTypes.func,
  setMapZoom: PropTypes.func,
  setMapCenter: PropTypes.func,
  setBasemap: PropTypes.func,
  setLabels: PropTypes.func,
  setBoundaries: PropTypes.func
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
  setMapCenter: (...params) => dispatch(setMapCenter(...params)),
  setBasemap: (...params) => dispatch(setBasemap(...params)),
  setLabels: (...params) => dispatch(setLabels(...params)),
  setBoundaries: (...params) => dispatch(setBoundaries(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(CompareMap);
