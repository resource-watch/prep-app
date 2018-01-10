import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { connect } from 'react-redux';

import L from 'leaflet';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import Control from 'react-leaflet-control';

import { getLayers } from 'selectors/nexgddptool';
import { setMarkerPosition, setMapZoom, setMapCenter, setBasemap, setBoundaries, setLabels, setMarkerMode } from 'actions/nexgddptool';

import BasemapControl from 'components/basemap-control';
import { basemapsSpec, labelsSpec, boundariesSpec } from 'components/basemap-control/basemap-control-constants';

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

class SimpleMap extends React.PureComponent {
  constructor(props) {
    super(props);
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

  render() {
    const { map, marker, markerMode, layers, range1Selection } = this.props;
    const currentLayer = layers[0];

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
        {currentLayer &&
          <div className="current-layer-label">
            {range1Selection.label}
          </div>
        }

        <Map
          className={mapClassNames}
          style={{ height: 440 }}
          {...mapOptions}
          onClick={this.addMarker}
          onViewportChanged={(...params) => this.onViewportChanged(...params)}
        >
          <TileLayer url={basemapsSpec[map.basemap].value} />
          {currentLayer && <TileLayer url={currentLayer.url} />}
          {map.boundaries && <TileLayer url={boundariesSpec.dark.value} />}
          {map.labels !== 'none' && <TileLayer url={labelsSpec[map.labels].value} />}

          {marker && <Marker position={marker} icon={L.divIcon({ className: 'map-marker' })} /> }

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
  markerMode: PropTypes.bool,
  layers: PropTypes.array,
  range1Selection: PropTypes.object,
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
  range1Selection: state.nexgddptool.range1.selection
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

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);
