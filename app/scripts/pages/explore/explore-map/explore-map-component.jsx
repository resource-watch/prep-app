import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
// import Map from 'components/map-vis';
import classnames from 'classnames';
import { getConfig } from 'widget-editor';
import BasemapControl from 'components/basemap-control';
import LegendControl from 'components/legend/legend-control';
import ShareControl from 'components/share-control';
import SearchControl from 'components/search-control';
import { basemapsSpec, labelsSpec, waterSpec, boundariesSpec } from 'components/basemap-control/basemap-control-constants';
import { Map, Legend, LegendListItem, LegendItemToolbar, LegendItemTypes, MapControls, ZoomControl } from 'wri-api-components';
import { LayerManager, Layer } from 'layer-manager/dist/react';
import { PluginLeaflet } from 'layer-manager';

class ExploreMap extends PureComponent {

  render() {
    const {
      setMapParams, setBBox, basemap, labels, water, boundaries, bbox, sidebar, zoom, lat, lng, minZoom, setBasemap,
      setLabels, setBoundaries, setWater, activeLayers, activeLayersForMap, embed, embedExport, layersGroups
    } = this.props;
    const classNames = classnames({ '-embed': embed, '-embed-export': embedExport });
    const left = (sidebar.open) ? 430 : 0;

    // Map configuration
    const mapConfig = {
      basemap: {
        url: basemapsSpec[basemap].value,
        options: basemapsSpec[basemap].options || {}
      },
      label: {
        url: labelsSpec[labels].value,
        options: labelsSpec[labels].options || {}
      },
      mapOptions: Object.assign({}, {
        zoom,
        minZoom,
        center: { lat, lng },
        zoomControl: false
      }),
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

    return (
      <div className={`c-explore-map ${classNames}`}>
        <Map {...mapConfig}>
          {(map) => (
            <Fragment>
              <LayerManager map={map} plugin={PluginLeaflet}>
                {activeLayers && activeLayers.map(l =>
                  <Layer key={l.id} {...l} />
                )}
              </LayerManager>
              <MapControls customClass="map-controls">
                <ZoomControl map={map} customClass="zoom-control" />
              </MapControls>
            </Fragment>
          )}
        </Map>

        <Legend
          maxWidth={500}
          maxHeight={300}
          layerGroups={layersGroups}
        >
          {layersGroups.map((lg, i) => (
            <LegendListItem
              index={i}
              key={lg.dataset}
              layerGroup={lg}
              toolbar={
                <LegendItemToolbar
                  onChangeVisibility={l => this.props.toggleVisibility({ id: l.dataset })}
                  onChangeInfo={l => this.props.toggleInfo({ id: l.dataset })}
                  onChangeOpacity={(l, opacity) => this.props.updateOpacity({ id: l.dataset, opacity })}
                  onRemoveLayer={l => this.props.toggleDataset({ id: l.dataset })}
                  onChangeBBox={(l) => {
                    this.props.setBBox(l.layerConfig.bbox);
                    // Reset the bounds inmediatly to have the possibility to click on it again
                    requestAnimationFrame(() => {
                      this.props.setBBox(null);
                    });
                  }}
                />
              }
            >
              <LegendItemTypes />
            </LegendListItem>
          ))}
        </Legend>

        { !embedExport &&
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
        }

        {!(embed || embedExport) &&
          <ShareControl
            className="-absolute" // pfff....
            open={this.props.open}
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
            setOpen={this.props.setOpen}
            setLinks={this.props.setLinks}
            setTab={this.props.setTab}
            analytics={{
              category: 'Explore data',
              action: 'Share a map'
            }}
          />
        }

        {!(embed || embedExport) &&
          <SearchControl
            className="-absolute -explore"
            onChange={(bbox) => {
              this.props.setBBox(bbox);

              // Reset the bounds inmediatly to have the possibility to click on it again
              requestAnimationFrame(() => {
                this.props.setBBox(null);
              });
            }}
            open
          />
        }
      </div>
    );
  }

  // constructor(props) {
  //   super(props);
  //   this.onSortChange = this.onSortChange.bind(this);
  // }

  // onSortChange(layers) {
  //   this.props.updateZIndex(layers);
  // }

  // render() {
  //   const {
  //     setMapParams, setBBox, basemap, labels, water, boundaries, bbox, sidebar, zoom, lat, lng, minZoom, setBasemap,
  //     setLabels, setBoundaries, setWater, activeLayers, activeLayersForMap, embed, embedExport
  //   } = this.props;

  //   const currentBasemap = basemapsSpec[basemap];
  //   const currentLabels = labelsSpec[labels];
  //   const currentBoundaries = boundaries ? boundariesSpec.dark : {};
  //   const currentWater = waterSpec[water];
  //   const currentMapOptions = Object.assign({}, {
  //     zoom,
  //     minZoom,
  //     center: { lat, lng }
  //   });

  //   const classNames = classnames({ '-embed': embed, '-embed-export': embedExport });

  //   const { origin, search } = window.location;

  //   return (
  //     <div className={`c-explore-map ${classNames}`}>
  //       <Map
  //         mapOptions={currentMapOptions}
  //         basemap={currentBasemap}
  //         labels={currentLabels}
  //         boundaries={currentBoundaries}
  //         water={currentWater}
  //         layers={activeLayersForMap}
  //         bbox={bbox}
  //         sidebar={sidebar}
  //         onChange={setMapParams}
  //       >
  //         { !embedExport &&
  //           <BasemapControl
  //             className="-absolute" // pfff....
  //             basemap={basemap}
  //             water={water}
  //             labels={labels}
  //             boundaries={boundaries}
  //             setBasemap={setBasemap}
  //             setLabels={setLabels}
  //             setWater={setWater}
  //             setBoundaries={setBoundaries}
  //           />
  //         }

  //         {!(embed || embedExport) &&
  //           <ShareControl
  //             className="-absolute" // pfff....
  //             open={this.props.open}
  //             links={Object.assign(
  //               {
  //                 link: window.location.href,
  //                 embed: `${origin}/embed/explore/${search}`
  //               },
  //               activeLayers.length && getConfig().userToken
  //                 ? {
  //                   widget: {
  //                     url: `${origin}/embed/explore/${search}`,
  //                     dataset: activeLayers[0].dataset,
  //                     widgetLinks: activeLayers.slice(1)
  //                       .map(d => ({
  //                         name: d.name,
  //                         link: `${origin}/dataset/${d.dataset}`
  //                       }))
  //                   }
  //                 }
  //                 : {}
  //             )}
  //             setOpen={this.props.setOpen}
  //             setLinks={this.props.setLinks}
  //             setTab={this.props.setTab}
  //             analytics={{
  //               category: 'Explore data',
  //               action: 'Share a map'
  //             }}
  //           />
  //         }

  //         {!(embed || embedExport) &&
  //           <SearchControl
  //             className="-absolute -explore"
  //             onChange={(bbox) => {
  //               this.props.setBBox(bbox);

  //               // Reset the bounds inmediatly to have the possibility to click on it again
  //               requestAnimationFrame(() => {
  //                 this.props.setBBox(null);
  //               });
  //             }}
  //             open
  //           />
  //         }
  //       </Map>

  //       {!!activeLayers.length &&
  //         <LegendControl
  //           collapsed={embed}
  //           embedExport={embedExport}
  //           layersSpec={activeLayers}
  //           position="topright"
  //           onSortChange={this.onSortChange}
  //           sortable
  //           onVisibility={l => this.props.toggleVisibility({ id: l.dataset })}
  //           onInfo={l => this.props.toggleInfo({ id: l.dataset })}
  //           onOpacity={this.props.updateOpacity}
  //           onClose={l => this.props.toggleDataset({ id: l.dataset })}
  //           onMultiLayer={l => this.props.setMultiActiveLayer(l)}
  //           onFitBounds={(l) => {
  //             this.props.setBBox(l.layerConfig.bbox);

  //             // Reset the bounds inmediatly to have the possibility to click on it again
  //             requestAnimationFrame(() => {
  //               this.props.setBBox(null);
  //             });
  //           }}
  //         />}
  //     </div>
  //   );
  // }
}

ExploreMap.defaultProps = { activeLayers: [] };

ExploreMap.propTypes = {
  basemap: PropTypes.oneOf(['default', 'dark', 'light', 'satellite', 'terrain']),
  labels: PropTypes.oneOf(['none', 'dark', 'light']),
  water: PropTypes.oneOf(['none', 'dark', 'light']),
  activeLayers: PropTypes.array,
  boundaries: PropTypes.bool,
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
};

export default ExploreMap;
