import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { connect } from 'react-redux';

import L from 'leaflet';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import Control from 'react-leaflet-control';
import 'lib/leaflet-side-by-side/leaflet-side-by-side';

// Redux
import { getLayers, getRawLayers } from 'selectors/nexgddptool';
import { setMarkerPosition, setMapZoom, setMapCenter, setBasemap, setBoundaries, setLabels, setMarkerMode } from 'actions/nexgddptool';

import BasemapControl from 'components/basemap-control';
import { basemapsSpec, labelsSpec, boundariesSpec } from 'components/basemap-control/basemap-control-constants';
import Legend from 'components/legend/index';

// Components
import Icon from 'components/ui/Icon';

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
  constructor(props) {
    super(props);

    // BINDINGS
    this.addMarker = this.addMarker.bind(this);
    this.setMarkerMode = this.setMarkerMode.bind(this);
  }

  componentDidMount() {
    const { layers } = this.props;

    const map = this.mapElement.leafletElement;
    this.sideBySideControl = L.control.sideBySide();
    this.sideBySideControl.addTo(map);

    if (layers.length) {
      const leftLayer = L.tileLayer(layers[0].url, {
        maxZoom: 5,
        minZoom: 3
      });

      const rightLayer = L.tileLayer(layers[1].url, {
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

    // We add the static layers
    this.updateStaticLayers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { layers: nextLayers } = nextProps;
    const { layers: currentLayers } = this.props;

    const hasChangedLayers = (currentLayers.length !== nextLayers.length)
      || nextLayers.some((l, i) => l.url !== (currentLayers[i] || {}).url);

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

  onViewportChanged({ zoom, center }) {
    if (zoom !== this.props.map.zoom) this.props.setMapZoom(zoom);
    if (center[0] !== this.props.map.center[0]
      || center[1] !== this.props.map.center[1]) {
      this.props.setMapCenter(center);
    }
  }

  setMarkerMode() {
    const { markerMode } = this.props;
    this.props.setMarkerMode(!markerMode);
  }

  addMarker({ latlng }) {
    const { markerMode } = this.props;

    if (markerMode) {
      this.props.setMarkerPosition([latlng.lat, latlng.lng]);
      this.props.setMarkerMode(false);
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
    const { map, marker, markerMode, range1Selection, range2Selection, rawLayers } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: map.center || mapDefaultOptions.center,
      zoom: map.zoom || mapDefaultOptions.zoom
    });

    const mapClassNames = classnames({
      '-crosshair': markerMode
    });

    const makerControlClassNames = classnames({
      '-active': markerMode
    });

    return (
      <div className="c-tool-map">
        <div
          className="current-layer-label"
        >
          {range1Selection.label}
        </div>

        <div
          className="current-layer-label -right"
        >
          {range2Selection.label}
        </div>

        <Map
          className={mapClassNames}
          ref={(el) => { this.mapElement = el; }}
          style={{ height: 440 }}
          {...mapOptions}
          onClick={this.addMarker}
          onViewportChanged={(...params) => this.onViewportChanged(...params)}
        >
          <TileLayer url={basemapsSpec[map.basemap].value} />

          { marker && <Marker position={marker} icon={L.divIcon({ className: 'map-marker' })} /> }

          <ZoomControl position="bottomright" />

          <Control position="bottomright" >
            <button
              type="button"
              className={`c-button-map ${makerControlClassNames}`}
              onClick={this.setMarkerMode}
            >
              {markerMode &&
                <Icon name="icon-cancel" className="-small" />
              }

              {!markerMode &&
                <Icon name="icon-marker" className="-small" />
              }
            </button>
          </Control>

          <Control position="bottomright" >
            <BasemapControl
              basemap={map.basemap}
              labels={map.labels}
              boundaries={map.boundaries}
              setBasemap={this.props.setBasemap}
              setLabels={this.props.setLabels}
              setBoundaries={this.props.setBoundaries}
            />
          </Control>
        </Map>

        { !!rawLayers.length && (
          <Legend
            layerSpec={rawLayers[0]}
            toolbar={false}
          />
        )}
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
  rawLayers: PropTypes.array,
  marker: PropTypes.array,
  markerMode: PropTypes.bool,
  range1Selection: PropTypes.object,
  range2Selection: PropTypes.object,
  setMarkerMode: PropTypes.func,
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
  markerMode: state.nexgddptool.markerMode,
  layers: getLayers(state),
  rawLayers: getRawLayers(state),
  range1Selection: state.nexgddptool.range1.selection,
  range2Selection: state.nexgddptool.range2.selection
});

const mapDispatchToProps = {
  setMarkerMode,
  setMarkerPosition,
  setMapZoom,
  setMapCenter,
  setBasemap,
  setLabels,
  setBoundaries
};

export default connect(mapStateToProps, mapDispatchToProps)(CompareMap);
