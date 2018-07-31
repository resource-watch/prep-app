import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getConfig } from 'widget-editor';
import BasemapControl from 'components/basemap-control';
import LegendNexGDDPToolbar from 'components/legend/legend-nexgddp-toolbar';
import LegendLOCAToolbar from 'components/legend/legend-loca-toolbar';
import ShareControl from 'components/share-control';
import SearchControl from 'components/search-control';
import { basemapsSpec, labelsSpec, waterSpec, boundariesSpec } from 'components/basemap-control/basemap-control-constants';
import {
  Map, MapControls, ZoomControl,
  Legend, LegendListItem, LegendItemToolbar, LegendItemTypes,
  LegendItemButtonBBox, LegendItemButtonInfo,
  LegendItemButtonLayers, LegendItemButtonOpacity, LegendItemButtonVisibility, LegendItemButtonRemove
} from 'wri-api-components';
import { LayerManager } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';
// import { updateActiveDatasets } from '../explore-datasets-list/explore-datasets-list-reducers';

class ExploreMap extends PureComponent {

  static propTypes = {
    basemap: PropTypes.oneOf(['default', 'dark', 'light', 'satellite', 'terrain']),
    labels: PropTypes.oneOf(['none', 'dark', 'light']),
    water: PropTypes.oneOf(['none', 'dark', 'light']),
    boundaries: PropTypes.bool,

    activeLayers: PropTypes.array,
    activeLayersForMap: PropTypes.array,
    layersGroups: PropTypes.array,

    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    lat: PropTypes.number,
    lng: PropTypes.number,

    embed: PropTypes.bool,
    embedExport: PropTypes.bool,
    open: PropTypes.bool,
    bbox: PropTypes.any,
    sidebar: PropTypes.object,
    setBasemap: PropTypes.func,
    setLabels: PropTypes.func,
    setBoundaries: PropTypes.func,
    setWater: PropTypes.func,
    setMapParams: PropTypes.func,
    updateZIndex: PropTypes.func,
    toggleInfo: PropTypes.func,
    toggleDataset: PropTypes.func,
    toggleVisibility: PropTypes.func,
    updateOpacity: PropTypes.func,
    setMultiActiveLayer: PropTypes.func,
    setBBox: PropTypes.func,
    setOpen: PropTypes.func,
    setLinks: PropTypes.func,
    setTab: PropTypes.func
  }

  static defaultProps = {
    basemap: 'default',
    labels: 'none',
    water: 'none',

    boundaries: false,
    activeLayers: [],
    activeLayersForMap: [],
    layersGroups: [],

    zoom: 2,
    minZoom: 2,
    lat: 0,
    lng: 0,

    embed: false,
    embedExport: false,
    open: false,
    bbox: [],
    sidebar: {},

    setBasemap: () => {},
    setLabels: () => {},
    setBoundaries: () => {},
    setWater: () => {},
    setMapParams: () => {},
    updateZIndex: () => {},
    toggleInfo: () => {},
    toggleDataset: () => {},
    toggleVisibility: () => {},
    updateOpacity: () => {},
    setMultiActiveLayer: () => {},
    setBBox: () => {},
    setOpen: () => {},
    setLinks: () => {},
    setTab: () => {}
  }

  constructor(props) {
    super(props);
    this.onSortChange = this.onSortChange.bind(this);
  }

  componentDidUpdate() {
    if (this.map) {
      this.setBoundaries();
      this.setWater();
    }
  }

  onSortChange(layerIDs) {
    const { activeLayers, updateZIndex } = this.props;
    const sortedLayers = layerIDs.map((layerID, index) => {
      const layer = activeLayers.find(a => a.dataset === layerID);
      return {
        dataset: layer.dataset,
        zIndex: index
      };
    });
    updateZIndex(sortedLayers);
  }

  // setNexGDDPLayer(layerActive, layerParams) {
  //   // const { onMultiLayer } = this.props;
  //   // onMultiLayer({ ...layerParams, id: layerActive.dataset });
  // }

  // setLocaLayer(layerActive, layerParams) {
  //   console.log(layerParams)
  // }

  setBoundaries() {
    if (this.boundaries) this.map.removeLayer(this.boundaries);
    const { boundaries } = this.props;
    if (boundaries) {
      this.boundaries = L.tileLayer(boundariesSpec.dark.value, { ...boundariesSpec.dark.options, zIndex: 10001 });
      this.map.addLayer(this.boundaries);
    }
  }

  setWater() {
    if (this.water) this.map.removeLayer(this.water);
    const { water } = this.props;
    if (water) {
      this.water = L.tileLayer(waterSpec[water].value, { ...waterSpec[water].options, zIndex: 10002 });
      this.map.addLayer(this.water);
    }
  }

  getMapParams() {
    const center = this.map.getCenter();
    return { zoom: this.map.getZoom(), lat: center.lat, lng: center.lng };
  }

  getLegendToolbar(layerActive) {
    const { setMultiActiveLayer } = this.props;
    if (layerActive.provider === 'nexgddp') {
      return (
        <LegendNexGDDPToolbar
          layerSpec={layerActive}
          onMultiLayer={l => () => console.log('jsjsjsjsj') || setMultiActiveLayer({ ...l, layerId: layerActive.id })}
        />
      );
    }
    if (layerActive.provider === 'loca') {
      return (
        <LegendLOCAToolbar
          layerSpec={layerActive}
          onMultiLayer={l => setMultiActiveLayer({ ...l, layerId: layerActive.id })}
        />
      );
    }
    return null;
  }

  render() {
    const {
      setMapParams, setBBox, basemap, labels, water, boundaries, bbox, sidebar, zoom, lat, lng, minZoom, setBasemap,
      setLabels, setBoundaries, setWater, embed, embedExport, layersGroups, activeLayersForMap, activeLayers,
      toggleVisibility, toggleInfo, updateOpacity, toggleDataset, setOpen, setLinks, setTab, setMultiActiveLayer
    } = this.props;
    const classNames = classnames({ '-embed': embed, '-embed-export': embedExport });
    const { open } = sidebar;
    const left = open ? 430 : 0;

    // Map configuration
    const mapConfig = {
      basemap: {
        url: basemapsSpec[basemap].value,
        options: basemapsSpec[basemap].options || {}
      },
      label: {
        url: labelsSpec[labels].value,
        options: labelsSpec[labels].options || {}
      },
      mapOptions: Object.assign({}, {
        zoom,
        minZoom,
        center: { lat, lng },
        zoomControl: false
      }),
      events: {
        zoomend: () => setMapParams(this.getMapParams()),
        moveend: () => setMapParams(this.getMapParams())
      },
      ...bbox && {
        bounds: {
          bbox,
          options: {
            paddingTopLeft: [left + 32, 32], // Padding Left Top... Leaflet? What the hell??
            paddingBottomRight: [32, 32]
          }
        }
      }
    };

    // Search control
    const { origin, search } = window.location;

    const Toolbar = (props) => {
      const { lg } = props; // eslint-disable-line
      const layerActive = lg.layers.find(l => (l.active || l.isActive)) || lg.layers[0];
      return (
        <LegendItemToolbar
          {...props}
          onChangeVisibility={l => toggleVisibility({ id: l.dataset })}
          onChangeInfo={l => toggleInfo({ id: l.dataset })}
          onChangeOpacity={(l, opacity) => updateOpacity({ id: l.dataset, opacity })}
          onRemoveLayer={l => toggleDataset({ id: l.dataset })}
          onChangeBBox={(l) => {
            setBBox(l.layerConfig.bbox);
            // Reset the bounds inmediatly to have the possibility to click on it again
            requestAnimationFrame(() => {
              setBBox(null);
            });
          }}
          onChangeLayer={l => setMultiActiveLayer(l)}
        >
          <LegendItemButtonBBox />
          {(layerActive.provider !== 'nexgddp' && layerActive.provider !== 'loca') && <LegendItemButtonLayers />}
          <LegendItemButtonOpacity />
          <LegendItemButtonVisibility />
          <LegendItemButtonInfo />
          <LegendItemButtonRemove />
        </LegendItemToolbar>
      );
    };

    return (
      <div className={`c-explore-map ${classNames}`}>
        <Map {...mapConfig}>
          {(map) => {
            this.map = map;
            return (
              <Fragment>
                <LayerManager map={map} plugin={PluginLeaflet} layersSpec={activeLayersForMap} />
                <MapControls customClass="map-controls">
                  <ZoomControl map={map} customClass="zoom-control" />
                </MapControls>
              </Fragment>
            );
          }}
        </Map>

        <Legend
          maxWidth={500}
          maxHeight={300}
          onChangeOrder={layers => this.onSortChange(layers)}
        >
          {layersGroups.map((lg, i) => {
            const layerActive = lg.layers.find(l => l.isLayerActive) || lg.layers[0];
            return (
              <LegendListItem
                index={i}
                key={lg.dataset}
                layerGroup={lg}
                toolbar={<Toolbar lg={lg} />}
              >
                {this.getLegendToolbar(layerActive)}
                <LegendItemTypes />
              </LegendListItem>
            );
          })}
        </Legend>

        { !embedExport && (
          <BasemapControl
            className="-absolute" // pfff....
            basemap={basemap}
            water={water}
            labels={labels}
            boundaries={boundaries}
            setBasemap={setBasemap}
            setLabels={setLabels}
            setWater={setWater}
            setBoundaries={setBoundaries}
          />
        )}

        {!(embed || embedExport) && (
          <ShareControl
            className="-absolute" // pfff....
            open={open}
            links={Object.assign(
              {
                link: window.location.href,
                embed: `${origin}/embed/explore/${search}`
              },
              activeLayers.length && getConfig().userToken
                ? {
                  widget: {
                    url: `${origin}/embed/explore/${search}`,
                    dataset: activeLayers[0].dataset,
                    widgetLinks: activeLayers.slice(1)
                      .map(d => ({
                        name: d.name,
                        link: `${origin}/dataset/${d.dataset}`
                      }))
                  }
                }
                : {}
            )}
            setOpen={setOpen}
            setLinks={setLinks}
            setTab={setTab}
            analytics={{
              category: 'Explore data',
              action: 'Share a map'
            }}
          />
        )}

        {!(embed || embedExport) && (
          <SearchControl
            className="-absolute -explore"
            onChange={(nextBbox) => {
              setBBox(nextBbox);
              // Reset the bounds inmediatly to have the possibility to click on it again
              requestAnimationFrame(() => {
                setBBox(null);
              });
            }}
            open
          />
        )}
      </div>
    );
  }
}

export default ExploreMap;
