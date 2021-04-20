import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import Control from 'react-leaflet-control';

// Redux
import { getActiveLayers, getActiveRawLayers } from 'selectors/nexlocageetool';
import { setMarkerPosition, setMapZoom, setMapCenter, setBasemap, setBoundaries, setLabels, setWater, setMarkerMode } from 'actions/nexlocageetool';
import * as shareModalActions from 'components/share-modal/share-modal-actions';
import { toggleTooltip } from 'actions/tooltip';

// Components
import Legend from 'components/legend/index';
import BasemapControl from 'components/basemap-control';
import { basemapsSpec, labelsSpec, boundariesSpec, waterSpec } from 'components/basemap-control/basemap-control-constants';
import Icon from 'components/ui/Icon';
import ShareNexgddpTooltip from 'components/Tooltip/ShareNexLocaGeeTooltip';
import PositionControlTooltip from 'components/nexlocagee-tool/position-control-tooltip';


const mapDefaultOptions = {
  center: [20, -30],
  zoom: 3,
  minZoom: 3,
  maxZoom: 7,
  scrollWheelZoom: false,
  attributionControl: false,
  zoomControl: false
};

class DifferenceMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addMarker = this.addMarker.bind(this);
    this.setMarkerMode = this.setMarkerMode.bind(this);
  }

  onViewportChanged({ zoom, center }) {
    const { map, setMapZoom: setMapZoomProp, setMapCenter: setMapCenterProp } = this.props;
    if (zoom !== map.zoom) setMapZoomProp(zoom);
    if (center[0] !== map.center[0]
      || center[1] !== map.center[1]) {
        setMapCenterProp(center);
    }
  }

  /**
   * Event handler executed when the user clicks the share button
   * @param {MouseEvent} e Event object
   */
  onClickShare(e) {
    // Prevent the tooltip from auto-closing
    e.stopPropagation();

    const { dataset, toggleTooltip: toggleTooltipProp } = this.props;
    const { origin, search } = window.location;

    toggleTooltipProp(true, {
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
            url: `${origin}/embed/nexgddp/${dataset.id}${search}&render=map`
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

    const { toggleTooltip: toggleTooltipProp } = this.props;

    toggleTooltipProp(true, {
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
    const { markerMode, setMarkerMode: setMarkerModeProp } = this.props;
    setMarkerModeProp(!markerMode);
  }

  addMarker({ latlng }) {
    const { markerMode, setMarkerPosition: setMarkerPositionProp, setMarkerMode: setMarkerModeProp } = this.props;

    if (markerMode) {
      setMarkerPositionProp([latlng.lat, latlng.lng]);
      setMarkerModeProp(false);
    }
  }

  render() {
    const {
      embed, map, marker, markerMode, layers, rawLayers,
      setBasemap: setBasemapProp, setWater: setWaterProp, setLabels: setLabelsProp, setBoundaries: setBoundariesProp,
    } = this.props;

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

          <Control position="bottomright">
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

          <Control position="bottomright">
            <BasemapControl
              basemap={map.basemap}
              labels={map.labels}
              boundaries={map.boundaries}
              water={map.water}
              setBasemap={setBasemapProp}
              setLabels={setLabelsProp}
              setWater={setWaterProp}
              setBoundaries={setBoundariesProp}
            />
          </Control>

          {!embed && (
            <Control position="bottomright">
              <button type="button" className="c-button-map" onClick={e => this.onClickPosition(e)}>
                <Icon name="icon-position" className="-small" />
              </button>
            </Control>
          )}

          {!embed && (
            <Control position="bottomright">
              <button
                type="button"
                className="c-button-map"
                onClick={this.onClickShare}
              >
                <Icon name="icon-share" className="-small" />
              </button>
            </Control>
          )}

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

DifferenceMap.defaultProps = {
};

DifferenceMap.propTypes = {
  dataset: PropTypes.shape({}).isRequired,
  map: PropTypes.shape({
    zoom: PropTypes.number,
    center: PropTypes.array
  }).isRequired,
  marker: PropTypes.arrayOf(PropTypes.number).isRequired,
  markerMode: PropTypes.bool.isRequired,
  setMarkerMode: PropTypes.func.isRequired,
  setMarkerPosition: PropTypes.func.isRequired,
  setMapZoom: PropTypes.func.isRequired,
  setMapCenter: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  embed: PropTypes.bool.isRequired,
  layers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rawLayers: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setBasemap: PropTypes.func.isRequired,
  setLabels: PropTypes.func.isRequired,
  setWater: PropTypes.func.isRequired,
  setBoundaries: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
  setLinks: PropTypes.func.isRequired,
  toggleTooltip: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  map: state.nexlocageetool.map,
  marker: state.nexlocageetool.marker,
  markerMode: state.nexlocageetool.markerMode,
  layers: getActiveLayers(state),
  rawLayers: getActiveRawLayers(state),
  dataset: state.nexlocageetool.dataset,
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
