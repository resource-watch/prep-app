import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { connect } from 'react-redux';

import L from 'leaflet';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import Control from 'react-leaflet-control';

import { getLayers, getRawLayers } from 'selectors/nexgddptool';
import { setMarkerPosition, setMapZoom, setMapCenter, setBasemap, setBoundaries, setLabels, setMarkerMode } from 'actions/nexgddptool';
import * as shareModalActions from 'components/share-modal/share-modal-actions';

import BasemapControl from 'components/basemap-control';
import { basemapsSpec, labelsSpec, boundariesSpec } from 'components/basemap-control/basemap-control-constants';
import ShareControl from 'components/share-control/share-control-component';
import Legend from 'components/legend/index';

import Icon from 'components/ui/Icon';

const mapDefaultOptions = {
  center: [20, -30],
  zoom: 3,
  minZoom: 3,
  maxZoom: 7,
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
    const { dataset, map, marker, markerMode, layers, range1Selection, rawLayers, embed } = this.props;
    const currentLayer = !!layers.length && layers[0];

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

    const { origin, search } = window.location;

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
          {map.boundaries && <TileLayer url={boundariesSpec.dark.value} zIndex={9} />}
          {map.labels !== 'none' && <TileLayer url={labelsSpec[map.labels].value} zIndex={10} />}

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

          {!embed &&
            <Control position="bottomright">
              <ShareControl
                open={this.props.open}
                links={{
                  embed: `${origin}/embed/nexgddp/${(dataset || {}).slug}${search}&render=map`
                }}
                setOpen={this.props.setOpen}
                setLinks={this.props.setLinks}
              />
            </Control>
          }

        </Map>

        { !!rawLayers.length && (
          <Legend
            layerSpec={rawLayers[0]}
            toolbar={false}
            actions={false}
          />
        )}
      </div>
    );
  }
}

SimpleMap.propTypes = {
  dataset: PropTypes.object,
  map: PropTypes.shape({
    zoom: PropTypes.number,
    center: PropTypes.array
  }),
  marker: PropTypes.array,
  markerMode: PropTypes.bool,
  layers: PropTypes.array,
  rawLayers: PropTypes.array,
  range1Selection: PropTypes.object,
  open: PropTypes.bool,
  embed: PropTypes.bool,
  setMarkerPosition: PropTypes.func,
  setMarkerMode: PropTypes.func,
  setMapZoom: PropTypes.func,
  setMapCenter: PropTypes.func,
  setBasemap: PropTypes.func,
  setLabels: PropTypes.func,
  setBoundaries: PropTypes.func,
  setOpen: PropTypes.func,
  setLinks: PropTypes.func
};

const mapStateToProps = state => ({
  dataset: state.nexgddptool.dataset,
  map: state.nexgddptool.map,
  marker: state.nexgddptool.marker,
  markerMode: state.nexgddptool.markerMode,
  layers: getLayers(state),
  rawLayers: getRawLayers(state),
  range1Selection: state.nexgddptool.range1.selection,
  open: state.shareModal.open
});

const mapDispatchToProps = {
  setMarkerMode,
  setMarkerPosition,
  setMapZoom,
  setMapCenter,
  setBasemap,
  setLabels,
  setBoundaries,
  ...shareModalActions
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);
