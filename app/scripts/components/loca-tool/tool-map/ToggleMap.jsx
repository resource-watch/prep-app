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

class ToggleMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
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

  toggleLayer() {
    this.setState({ index: this.state.index === 0 ? 1 : 0 });
  }

  render() {
    const { embed, map, marker, markerMode, layers, range1Selection, range2Selection, rawLayers } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: map.center || mapDefaultOptions.center,
      zoom: map.zoom || mapDefaultOptions.zoom
    });

    const mapClassNames = classnames({ '-crosshair': markerMode });

    const makerControlClassNames = classnames({ '-active': markerMode });

    const currentLayer = !!layers.length && layers[this.state.index];

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
          onClick={this.addMarker}
          onSingleclick={({ latlng }) => this.props.setMarkerPosition([latlng.lat, latlng.lng])}
          onViewportChanged={(...params) => this.onViewportChanged(...params)}
        >
          <TileLayer url={basemapsSpec[map.basemap].value} />
          { currentLayer && <TileLayer url={currentLayer.url} /> }
          { map.water !== 'none' && <TileLayer url={waterSpec[map.water].value} zIndex={8} /> }
          { map.boundaries && <TileLayer url={boundariesSpec.dark.value} zIndex={9} /> }
          { map.labels !== 'none' && <TileLayer url={labelsSpec[map.labels].value} zIndex={10} /> }
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
              setAnalytics={shareModalActions.setAnalytics}
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

ToggleMap.propTypes = {
  dataset: PropTypes.object,
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
  open: PropTypes.bool,
  embed: PropTypes.bool,
  setMarkerPosition: PropTypes.func,
  setMarkerMode: PropTypes.func,
  setMapZoom: PropTypes.func,
  setMapCenter: PropTypes.func,
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
  range1Selection: state.locatool.range1.selection,
  range2Selection: state.locatool.range2.selection,
  dataset: state.locatool.dataset,
  open: state.shareModal.open
});

const mapDispatchToProps = {
  setMarkerPosition,
  setMarkerMode,
  setMapZoom,
  setMapCenter,
  setBasemap,
  setLabels,
  setWater,
  setBoundaries,
  ...shareModalActions,
  toggleTooltip
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleMap);
