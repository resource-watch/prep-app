import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import Control from 'react-leaflet-control';

// Redux
import { getLayers, getRawLayers } from 'selectors/locatool';
import { setMarkerPosition, setMapZoom, setMapCenter, setBasemap, setBoundaries, setLabels, setWater, setMarkerMode } from 'actions/locatool';
import * as shareModalActions from 'components/share-modal/share-modal-actions';
import { toggleTooltip } from 'actions/tooltip';

// Components
import Legend from 'components/legend/index';
import BasemapControl from 'components/basemap-control';
import { basemapsSpec, labelsSpec, boundariesSpec, waterSpec } from 'components/basemap-control/basemap-control-constants';
import Icon from 'components/ui/Icon';
import ShareNexgddpTooltip from 'components/Tooltip/ShareNexgddpTooltip';
import PositionControlTooltip from 'components/loca-tool/position-control-tooltip';

// EEUU bounds
const maxBounds = new L.LatLngBounds(
  new L.LatLng(49.496674527470455, -66.357421875),
  new L.LatLng(24.607069137709683, -131.66015625)
);

const mapDefaultOptions = {
  center: [-98.96484375, 39.30029918615029],
  zoom: 4,
  minZoom: 4,
  maxZoom: 7,
  scrollWheelZoom: false,
  attributionControl: false,
  zoomControl: false,
  maxBounds
};

class DifferenceMap extends React.PureComponent {
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

  /**
   * Event handler executed when the user clicks the share button
   * @param {MouseEvent} e Event object
   */
  onClickShare(e) {
    // Prevent the tooltip from auto-closing
    e.stopPropagation();

    const { dataset } = this.props;
    const { origin, search } = window.location;

    this.props.toggleTooltip(true, {
      follow: false,
      position: {
        x: window.scrollX + e.clientX,
        y: window.scrollY + e.clientY
      },
      direction: 'bottom',
      children: ShareNexgddpTooltip,
      childrenProps: {
        render: 'map',
        getWidgetConfig: () => new Promise((resolve) => {
          resolve({
            type: 'embed',
            url: `${origin}/embed/loca/${dataset.id}${search}&render=map`
          });
        })
      }
    });
  }

  /**
   * Event handler executed when the user clicks the position button
   * @param {MouseEvent} e Event object
   */
  onClickPosition(e) {
    // Prevent the tooltip from auto-closing
    e.stopPropagation();

    const { toggleTooltip } = this.props;

    toggleTooltip(true, {
      follow: false,
      position: {
        x: window.scrollX + e.clientX,
        y: window.scrollY + e.clientY
      },
      direction: 'bottom',
      children: PositionControlTooltip
    });
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
    const { embed, map, marker, markerMode, layers, rawLayers } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: map.center || mapDefaultOptions.center,
      zoom: map.zoom || mapDefaultOptions.zoom
    });

    const currentLayer = layers.length ? layers[0] : null;

    const mapClassNames = classnames({ '-crosshair': markerMode });

    const makerControlClassNames = classnames({ '-active': markerMode });

    return (
      <div className="c-tool-map">
        <Map
          className={mapClassNames}
          style={{ height: 440 }}
          {...mapOptions}
          onClick={this.addMarker}
          onViewportChanged={(...params) => this.onViewportChanged(...params)}
        >
          <TileLayer url={basemapsSpec[map.basemap].value} />
          { currentLayer && <TileLayer url={currentLayer.url} /> }
          { map.boundaries && <TileLayer url={boundariesSpec.dark.value} zIndex={9} /> }
          { map.labels !== 'none' && <TileLayer url={labelsSpec[map.labels].value} zIndex={10} /> }
          {map.water !== 'none' && <TileLayer url={waterSpec[map.water].value} zIndex={8} />}
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
              water={map.water}
              setBasemap={this.props.setBasemap}
              setLabels={this.props.setLabels}
              setWater={this.props.setWater}
              setBoundaries={this.props.setBoundaries}
            />
          </Control>

          { !embed && (
            <Control position="bottomright">
              <button type="button" className="c-button-map" onClick={e => this.onClickPosition(e)}>
                <Icon name="icon-position" className="-small" />
              </button>
            </Control>
          )}

          {!embed &&
            <Control position="bottomright">
              <button
                type="button"
                className="c-button-map"
                onClick={e => this.onClickShare(e)}
              >
                <Icon name="icon-share" className="-small" />
              </button>
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

DifferenceMap.propTypes = {
  dataset: PropTypes.object,
  map: PropTypes.shape({
    zoom: PropTypes.number,
    center: PropTypes.array
  }),
  marker: PropTypes.array,
  markerMode: PropTypes.bool,
  setMarkerMode: PropTypes.func,
  setMarkerPosition: PropTypes.func,
  setMapZoom: PropTypes.func,
  setMapCenter: PropTypes.func,
  open: PropTypes.bool,
  embed: PropTypes.bool,
  layers: PropTypes.array,
  rawLayers: PropTypes.array,
  setBasemap: PropTypes.func,
  setLabels: PropTypes.func,
  setWater: PropTypes.func,
  setBoundaries: PropTypes.func,
  setOpen: PropTypes.func,
  setLinks: PropTypes.func,
  toggleTooltip: PropTypes.func
};

const mapStateToProps = state => ({
  map: state.locatool.map,
  marker: state.locatool.marker,
  markerMode: state.locatool.markerMode,
  layers: getLayers(state),
  rawLayers: getRawLayers(state),
  dataset: state.locatool.dataset,
  open: state.shareModal.open
});

const mapDispatchToProps = {
  setMarkerMode,
  setMarkerPosition,
  setMapZoom,
  setMapCenter,
  setBasemap,
  setLabels,
  setWater,
  setBoundaries,
  ...shareModalActions,
  toggleTooltip
};

export default connect(mapStateToProps, mapDispatchToProps)(DifferenceMap);
