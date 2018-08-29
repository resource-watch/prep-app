import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import Control from 'react-leaflet-control';
// import 'lib/leaflet-side-by-side/leaflet-side-by-side';

// Redux
import { getLayers, getRawLayers } from 'selectors/nexgddptool';
import { setMarkerPosition, setMapZoom, setMapCenter, setBasemap, setBoundaries, setLabels, setWater, setMarkerMode } from 'actions/nexgddptool';
import * as shareModalActions from 'components/share-modal/share-modal-actions';
import { toggleTooltip } from 'actions/tooltip';

// Components
import Legend from 'components/legend/index';
import BasemapControl from 'components/basemap-control';
import { basemapsSpec, labelsSpec, boundariesSpec, waterSpec } from 'components/basemap-control/basemap-control-constants';
import Icon from 'components/ui/Icon';
import ShareNexgddpTooltip from 'components/Tooltip/ShareNexgddpTooltip';

const mapDefaultOptions = {
  center: [20, -30],
  zoom: 3,
  minZoom: 3,
  maxZoom: 7,
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
        maxZoom: 7,
        minZoom: 3
      });

      const rightLayer = L.tileLayer(layers[1].url, {
        minZoom: 3,
        maxZoom: 7
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
        maxZoom: 7,
        minZoom: 3
      });

      const rightLayer = L.tileLayer(nextLayers[1].url, {
        minZoom: 3,
        maxZoom: 7
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
            url: `${origin}/embed/nexgddp/${dataset.id}${search}&render=map`
          });
        })
      }
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
    const { embed, map, marker, markerMode, range1Selection, range2Selection, rawLayers } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: map.center || mapDefaultOptions.center,
      zoom: map.zoom || mapDefaultOptions.zoom
    });

    const mapClassNames = classnames({ '-crosshair': markerMode });

    const makerControlClassNames = classnames({ '-active': markerMode });

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

CompareMap.propTypes = {
  dataset: PropTypes.object,
  map: PropTypes.shape({
    zoom: PropTypes.number,
    center: PropTypes.array,
    basemap: PropTypes.string,
    labels: PropTypes.string,
    water: PropTypes.string,
    boundaries: PropTypes.bool
  }),
  layers: PropTypes.array,
  rawLayers: PropTypes.array,
  marker: PropTypes.array,
  markerMode: PropTypes.bool,
  open: PropTypes.bool,
  embed: PropTypes.bool,
  range1Selection: PropTypes.object,
  range2Selection: PropTypes.object,
  setMarkerMode: PropTypes.func,
  setMarkerPosition: PropTypes.func,
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
  map: state.nexgddptool.map,
  marker: state.nexgddptool.marker,
  markerMode: state.nexgddptool.markerMode,
  layers: getLayers(state),
  rawLayers: getRawLayers(state),
  range1Selection: state.nexgddptool.range1.selection,
  range2Selection: state.nexgddptool.range2.selection,
  dataset: state.nexgddptool.dataset,
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

export default connect(mapStateToProps, mapDispatchToProps)(CompareMap);
