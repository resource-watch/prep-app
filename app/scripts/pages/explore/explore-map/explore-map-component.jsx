import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import { getConfig } from 'widget-editor';
import BasemapControl from 'components/basemap-control';
import ShareControl from 'components/share-control';
import SearchControl from 'components/search-control';
import { basemapsSpec, labelsSpec, waterSpec, boundariesSpec } from 'components/basemap-control/basemap-control-constants';
import { LayerManager, Layer } from 'layer-manager/dist/components';
import { PluginLeaflet } from 'layer-manager';
import Map, { MapControls, ZoomControl } from 'wri-api-components/dist/map';
import Legend, {
  LegendListItem, LegendItemToolbar, LegendItemTypes,
  LegendItemButtonBBox, LegendItemButtonInfo,
  LegendItemButtonLayers, LegendItemButtonOpacity, LegendItemButtonVisibility, LegendItemButtonRemove
} from 'wri-api-components/dist/legend';
import LegendNexGDDPToolbar from './legend-nexgddp-toolbar';
import LegendLOCAToolbar from './legend-loca-toolbar';
import LegendNexLocaGeeToolbar from './legend-nexlocagee-toolbar';
import Popup from './explore-map-popup';
import { NexLocaGEEDatasetIds } from '../core-datasets-list/core-datasets-list-constants';
// import { updateActiveDatasets } from '../explore-datasets-list/explore-datasets-list-reducers';

class ExploreMap extends PureComponent {

  static propTypes = {
    basemap: PropTypes.oneOf(['default', 'dark', 'light', 'satellite', 'terrain']),
    labels: PropTypes.oneOf(['none', 'dark', 'light']),
    water: PropTypes.oneOf(['none', 'dark', 'light']),
    boundaries: PropTypes.bool,

    activeLayers: PropTypes.arrayOf(PropTypes.shape({})),
    activeLayersForMap: PropTypes.arrayOf(PropTypes.shape({})),
    layersGroups: PropTypes.arrayOf(PropTypes.shape({})),

    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    lat: PropTypes.number,
    lng: PropTypes.number,

    embed: PropTypes.bool,
    embedExport: PropTypes.bool,
    open: PropTypes.bool,
    bbox: PropTypes.arrayOf(PropTypes.number),
    sidebar: PropTypes.shape({}),
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
    setTab: PropTypes.func,
    setInteractions: PropTypes.func
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
    setTab: () => {},
    setInteractions: () => {}
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

  getLegendToolbar(layerGroups) {
    const { setMultiActiveLayer } = this.props;
    const { dataset, layers } = layerGroups;
    const isNexLocaGeeDataset = NexLocaGEEDatasetIds.includes(dataset);

    if (isNexLocaGeeDataset) {
      return (
        <LegendNexLocaGeeToolbar
          layers={layers}
          onMultiLayer={l => setMultiActiveLayer(l)}
        />
      );
    }

    const layerActive = layers.find(l => l.isLayerActive) || layers[0];

    if (layerActive.provider === 'nexgddp') {
      return (
        <LegendNexGDDPToolbar
          layerSpec={layerActive}
          onMultiLayer={l => setMultiActiveLayer({ ...l, layerId: layerActive.id })}
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
      toggleVisibility, toggleInfo, updateOpacity, toggleDataset, setOpen, setLinks, setTab, setMultiActiveLayer,
      setInteractions
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
        zoomControl: false,
        scrollWheelZoom: !(embed || embedExport)
      }),
      events: {
        zoomend: debounce(() => setMapParams(this.getMapParams()), 50),
        moveend: debounce(() => setMapParams(this.getMapParams()), 50)
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
      const layerActive = lg.layers.find(l => l.isLayerActive);
      const legendStyles = {
        defaultStyle: {
          fill: '#263E57'
        },
        enabledStyle: {
          fill: '#ffc94e'
        },
        disabledStyle: {
          fill: '#CACCD0'
        },
        focusStyle: {
          fill: '#ffc94e'
        }
      };

      return (
        <LegendItemToolbar
          {...props}
          {...legendStyles}
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
          onChangeLayer={l => setMultiActiveLayer({ id: l.dataset, layerId: l.id })}
        >
          <LegendItemButtonBBox />
          {(layerActive.provider !== 'nexgddp' && layerActive.provider !== 'loca') && (
            <LegendItemButtonLayers />
          )}
          <LegendItemButtonOpacity />
          <LegendItemButtonVisibility visibility={layerActive.visibility} />
          <LegendItemButtonInfo />
          {!(embed || embedExport) && <LegendItemButtonRemove />}
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
                <LayerManager map={map} plugin={PluginLeaflet}>
                  {activeLayersForMap.map((l) => (
                    <Layer
                      key={l.id}
                      {...l}
                      {...!!l.interactionConfig && l.interactionConfig.output && l.interactionConfig.output.length && {
                        ...(l.provider === 'carto' || l.provider === 'cartodb') && { interactivity: l.interactionConfig.output.map(o => o.column) },
                        events: {
                          click: (e) => {
                            const { data, latlng } = e;
                            if (data) {
                              setInteractions({
                                [l.id]: {
                                  id: l.id,
                                  latlng,
                                  data
                                }
                              });
                            }
                          }
                        }
                      }}
                    />
                  ))}
                </LayerManager>

                <MapControls customClass="map-controls">
                  <ZoomControl map={map} customClass="zoom-control" />
                </MapControls>

                <Popup
                  map={map}
                  layers={activeLayersForMap}
                />
              </Fragment>
            );
          }}
        </Map>

        <Legend
          maxWidth={500}
          maxHeight={300}
          onChangeOrder={layers => this.onSortChange(layers)}
        >
          {layersGroups.map((lg, i) => (
            <LegendListItem
              index={i}
              key={lg.dataset}
              layerGroup={lg}
              toolbar={<Toolbar lg={lg} />}
            >
              {this.getLegendToolbar(lg)}
              <LegendItemTypes />
            </LegendListItem>
          ))}
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
