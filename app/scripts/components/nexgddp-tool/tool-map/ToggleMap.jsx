import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { connect } from 'react-redux';

import L from 'leaflet';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import Control from 'react-leaflet-control';

// Redux
import { getLayers, getRawLayers } from 'selectors/nexgddptool';
import { setMarkerPosition, setMapZoom, setMapCenter, setBasemap, setBoundaries, setLabels, setMarkerMode } from 'actions/nexgddptool';

// Components
import BasemapControl from 'components/basemap-control';
import { basemapsSpec, labelsSpec, boundariesSpec } from 'components/basemap-control/basemap-control-constants';
import Legend from 'components/legend/index';

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

class ToggleMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.toggleLayer = this.toggleLayer.bind(this);

    this.addMarker = this.addMarker.bind(this);
    this.setMarkerMode = this.setMarkerMode.bind(this);
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

  toggleLayer() {
    this.setState({ index: this.state.index === 0 ? 1 : 0 });
  }

  render() {
    const { map, marker, markerMode, layers, range1Selection, range2Selection, rawLayers } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: map.center || mapDefaultOptions.center,
      zoom: map.zoom || mapDefaultOptions.zoom
    });

    const currentLayer = layers[this.state.index];

    const mapClassNames = classnames({
      '-crosshair': markerMode
    });

    const makerControlClassNames = classnames({
      '-active': markerMode
    });

    // FIXME: Very hacky
    // We need the layers to be deserialized but jsonapi-serializer's
    // function is async and we can't create async selectors with
    // reselect
    const deserializedLayers = rawLayers.map(l => Object.assign(
      {},
      l,
      { ...l.attributes },
      { legendConfig: l.attributes.legend_config }
    ));

    return (
      <div className="c-tool-map">
        <button
          className="c-button -filled -secondary-color switch-button"
          onClick={this.toggleLayer}
        >
          Switch
        </button>

        <div
          className="current-layer-label -right"
        >
          {this.state.index === 0 ? range1Selection.label : range2Selection.label}
        </div>

        <Map
          style={{ height: 440 }}
          className={mapClassNames}
          {...mapOptions}
          onSingleclick={({ latlng }) => this.props.setMarkerPosition([latlng.lat, latlng.lng])}
          onViewportChanged={(...params) => this.onViewportChanged(...params)}
        >
          <TileLayer url={basemapsSpec[map.basemap].value} />
          { currentLayer && <TileLayer url={currentLayer.url} /> }
          { map.boundaries && <TileLayer url={boundariesSpec.dark.value} /> }
          { map.labels !== 'none' && <TileLayer url={labelsSpec[map.labels].value} /> }
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

        <Legend
          layerSpec={deserializedLayers[0]}
          toolbar={false}
        />
      </div>
    );
  }
}

ToggleMap.propTypes = {
  map: PropTypes.shape({
    zoom: PropTypes.number,
    center: PropTypes.array
  }),
  mapOptions: PropTypes.object,
  marker: PropTypes.array,
  markerMode: PropTypes.bool,
  layers: PropTypes.array,
  rawLayers: PropTypes.array,
  range1Selection: PropTypes.object,
  range2Selection: PropTypes.object,
  setMarkerPosition: PropTypes.func,
  setMarkerMode: PropTypes.func,
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
  setMarkerPosition,
  setMarkerMode,
  setMapZoom,
  setMapCenter,
  setBasemap,
  setLabels,
  setBoundaries
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleMap);
