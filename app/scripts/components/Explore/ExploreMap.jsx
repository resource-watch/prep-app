import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import 'esri-leaflet';

// Libraries
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';

// Components
import LoadingSpinner from '../Loading/LoadingSpinner';
import Tooltip from '../Tooltip/Tooltip';

// Constants
import { LABELS, BOUNDARIES } from '../../general-constants/basemaps';

const tooltipBase = {
  hidden: true,
  position: {
    top: 0,
    left: 0
  },
  width: 'auto'
};

class ExploreMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tooltip: tooltipBase,
      layers: props.enabledLayers
    };
    this.latLngClicked = null;
  }

  componentDidMount() {
    this.initMap();
    this.setMapParams();
    this.setMapListeners();
    // this.updateDatasets();

    // Fixing height of map
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  componentDidUpdate(prevProps) {
    // Updating map only when datasets or layers have changed
    if (!isEqual(this.props.enabledDatasets, prevProps.enabledDatasets)) {
      this.updateDatasets(this.props.enabledDatasets, this.props.enabledLayers);
    } else if (!isEqual(this.props.enabledLayers, prevProps.enabledLayers)) {
      this.updateDatasets(this.props.enabledDatasets, this.props.enabledLayers);
    }

    // Updating basemap
    if (!isEqual(this.props.map.basemap, prevProps.map.basemap)) {
      this.addBasemap(this.props.map.basemap);
    } else if (!isEqual(this.props.map.labels, prevProps.map.labels)) {
      // Updating labels
      this.handleLabels(this.props.map.labels);
    } else if (!isEqual(this.props.map.boundaries, prevProps.map.boundaries)) {
      // Updating boundaries
      this.handleBoundaries(this.props.map.boundaries);
    }
  }

  setTooltipText(data) {
    const text = [];
    if (data) {
      const avoidedKeys = ['the_geom', 'the_geom_webmercator', 'cartodb_id'];
      const item = data.attributes ? data.attributes : data;

      Object.keys(item).forEach((key, i) => {
        avoidedKeys.indexOf(key) === -1 &&
          text.push(
            <tr key={i}>
              <th>{key}: </th><td>{item[key]}</td>
            </tr>
          );
      });
    }

    return this.tooltipText(text, data);
  }

  getActiveLayer(dataset, layers) {
    const activeLayer = Object.values(layers).find(l => dataset.id === l.dataset && l.active) ||
      Object.values(layers).find(l => dataset.id === l.dataset && l.default) ||
      Object.values(layers)[0] || {};
    return activeLayer;
  }

  setInteractionData(position) {
    const { datasetId } = this.props.interactionData;
    if (datasetId) {
      const TOLENRANCE = 2;
      const pointX = position.x;
      const pointY = position.y;
      const geo = [];
      let latLngPoint = this.map.layerPointToLatLng(L.point(pointX - TOLENRANCE, pointY + TOLENRANCE));
      geo.push([latLngPoint.lng, latLngPoint.lat]);
      latLngPoint = this.map.layerPointToLatLng(L.point(pointX + TOLENRANCE, pointY + TOLENRANCE));
      geo.push([latLngPoint.lng, latLngPoint.lat]);
      latLngPoint = this.map.layerPointToLatLng(L.point(pointX + TOLENRANCE, pointY - TOLENRANCE));
      geo.push([latLngPoint.lng, latLngPoint.lat]);
      latLngPoint = this.map.layerPointToLatLng(L.point(pointX - TOLENRANCE, pointY - TOLENRANCE));
      geo.push([latLngPoint.lng, latLngPoint.lat]);
      latLngPoint = this.map.layerPointToLatLng(L.point(pointX - TOLENRANCE, pointY + TOLENRANCE));
      geo.push([latLngPoint.lng, latLngPoint.lat]);
      const geoJSON = {
        type: 'Polygon',
        coordinates: [geo]
      };

      this.props.setInteractionData(datasetId, geoJSON);
      this.props.setInteractionPosition({ x: pointX, y: pointY });
    }
  }

  setMapParams() {
    this.props.setMapParams(this.getMapParams());
  }

  getMapParams() {
    const latLng = this.map.getCenter();
    return {
      zoom: this.map.getZoom(),
      latLng: {
        lat: latLng.lat,
        lng: latLng.lng
      }
    };
  }

  setMapListeners() {
    this.map.on('dragstart', () => {
      if (!this.state.tooltip.hidden) {
        this.clearTooltip();
        this.dragging = true;
      } else {
        this.dragging = false;
      }
    });
    this.map.on('dragend', () => {
      this.setMapParams();
      this.updateTooltipPosition();
    });
    this.map.on('zoomstart', () => {
      this.zooming = true;
    });
    this.map.on('zoomend', () => {
      this.setMapParams();
      this.updateTooltipPosition();
      this.zooming = false;
    });
    this.map.on('click', (e) => {
      this.handleMapClick(e);
    });
    this.map.on('blur', () => {
      this.clearTooltip();
    });
  }

  tooltipText(text, data) {
    return (
      <div>
        <div className="header">
          <h3>Dataset info</h3>
        </div>
        {data ?
          <div className="content">
            <table className="table-data">
              <tbody>{text}</tbody>
            </table>
          </div> :
          <p>No data available.</p>}
      </div>);
  }

  handleInteractivityTooltip(interactionData) {
    const text = this.setTooltipText(interactionData.info.data[0]);
    const tooltip = {
      text,
      hidden: false,
      position: {
        top: interactionData.position.y,
        left: interactionData.position.x
      },
      width: 'auto'
    };

    this.setState({ tooltip });
  }

  clearTooltip() {
    this.setState({ tooltip: tooltipBase });
    this.props.setInteractionVisibility(false);
  }

  updateTooltipPosition() {
    if (this.latLngClicked) {
      this.props.setInteractionPosition(this.map.latLngToContainerPoint(this.latLngClicked));
      if (this.dragging || this.zooming) this.props.setInteractionVisibility(true);
    }
  }

  handleMapClick(e) {
    this.latLngClicked = e.latlng;
    this.clearTooltip();
    this.setInteractionData(e.containerPoint);
  }

  addBasemap(basemap) {
    // Remove old basemap
    if (this.basemap) {
      this.map.removeLayer(this.basemap);
    }

    this.basemap = L.tileLayer(
      basemap.value,
      basemap.options
    ).addTo(this.map, 0);
  }

  handleLabels(labels) {
    if (this.labels) this.map.removeLayer(this.labels);

    if (labels) {
      this.labels = L.tileLayer(
        LABELS.value,
        LABELS.options
      ).addTo(this.map).setZIndex(10000);
    } else {
      this.labels = null;
    }
  }

  handleBoundaries(boundaries) {
    if (this.boundaries) this.map.removeLayer(this.boundaries);

    if (boundaries) {
      this.boundaries = L.tileLayer(
        BOUNDARIES.value,
        BOUNDARIES.options
      ).addTo(this.map).setZIndex(10000 - 1);
    } else {
      this.boundaries = null;
    }
  }

  initMap() {
    const { map } = this.props;
    const { params } = this.context.location;

    if (!params.zoom) params.zoom = 3;
    if (!params.lat) params.lat = 48.46038;
    if (!params.lng) params.lng = -123.889823;

    // layers cache
    this.mapLayers = {};

    this.map = L.map(this.mapElement, {
      zoomControl: false,
      center: [+params.lat, +params.lng],
      zoom: +params.zoom,
      minZoom: 2
    });

    L.control.zoom({ position: map.zoomPosition }).addTo(this.map);

    /* Ad basemap */
    this.addBasemap(map.basemap);
  }

  updateDatasets(newData, newLayers) {
    const datasets = newData || this.props.enabledDatasets;
    const layers = newLayers || this.props.enabledLayers;
    const mapLayers = this.mapLayers;
    const datasetsLength = datasets.length;

    this.hasActiveLayers = false;

    // Removing layers
    Object.keys(mapLayers).forEach((m) => {
      const existingLayer = mapLayers[m];
      // this.map.removeLayer(existingLayer);
      const isExistingLayer = !!(find(layers, { id: m }));
      if (!isExistingLayer) this.map.removeLayer(existingLayer);
    });

    if (datasetsLength) this.hasActiveLayers = true;

    datasets.forEach((d) => {
      if (d.layer && d.layer.length) {
        const layerData = find(d.layer, { active: true }) || find(d.layer, { default: true }) || d.layer[0];
        const layerSpec = Object.assign({}, { id: layerData.id }, layerData.attributes);
        const existingLayer = mapLayers[layerSpec.id];

        if (existingLayer) {
          const zIndex = (datasetsLength + 1) - d.index;

          if (existingLayer.setZIndex && typeof existingLayer.setZIndex === 'function') {
            this.map.addLayer(existingLayer);
            existingLayer.setZIndex(zIndex);
          } else {
            existingLayer.addTo(this.map);
            existingLayer.options.zIndex = zIndex;
            // TODO: improve z-index for overlay layers
            if (existingLayer._currentImage) {
              existingLayer._currentImage._image.style.zIndex = zIndex;
            }
          }
          existingLayer.setOpacity(d.opacity === 0 ? 0 : d.opacity || 1);
        } else {
          this.addMapLayer(d, layerSpec, datasetsLength);
        }
      }
    });
  }

  // wasAlreadyAdded(dataset, layers) {
  //   const layer = this.getActiveLayer(dataset, layers);
  //   return layer && this.mapLayers[layer.id] || false;
  // }

  // hasChangedOrder(dataset, layer) {
  //   return dataset.index !== undefined && layer &&
  //     dataset.index !== this.mapLayers[layer.id].index || false;
  // }

  // hasChangedOpacity(dataset, layer) {
  //   const hasChanged = (dataset && layer &&
  //     dataset.opacity !== this.mapLayers[layer.id].options.opacity) || false;
  //   return hasChanged;
  // }

  // isLayerReady(dataset, layers) {
  //   if (dataset.layer && dataset.layer.length) {
  //     const layer = dataset.layer.find(l => l.attributes.active) || dataset.layer.find(l => l.attributes.default) || dataset.layer[0];
  //     return layers && layer && layers[layer.id] || false;
  //   }
  //   return false;
  // }

  // updateActiveLayer(dataset, layers, datasetsLength) {
  //   const activeLayer = this.getActiveLayer(dataset, layers);

  //   if (!!this.isLayerReady(dataset, layers)) {
  //     const wasAlreadyAdded = this.wasAlreadyAdded(dataset, layers);

  //     if (!wasAlreadyAdded) {
  //       const inactiveLayers = Object.values(layers).filter(l => dataset.id === l.dataset && (l.active === false ||
  //           (l.active === undefined && !l.default)));
  //       const layer = layers[activeLayer.id];
  //       this.hasActiveLayers = true;

  //       inactiveLayers.forEach((l) => {
  //         if (this.mapLayers[l.id]) this.updateRemovedLayer(l.id);
  //       });

  //       this.addMapLayer(dataset, layer, datasetsLength);
  //     } else {
  //       if (this.hasChangedOrder(dataset, layers)) {
  //         this.changeLayerOrder(dataset, datasetsLength);
  //       }
  //       if (this.hasChangedOpacity(dataset, layers)) {
  //         this.changeLayerOpacity(layer, dataset);
  //       }
  //     }
  //   }
  // }

  updateRemovedLayer(layerId) {
    this.removeMapLayer(layerId);
  }

  // TODO change multilayer
  changeLayerOrder(dataset, datasetsLength) {
    const { layers } = this.props;
    const activeLayer = this.getActiveLayer(dataset, layers);
    const layer = this.mapLayers[activeLayer.id];

    if (dataset.index !== undefined && layer) {
      if (typeof layer.setZIndex === 'function') {
        layer.index = dataset.index;
        layer.setZIndex((datasetsLength + 1) - dataset.index);
      } else {
        const layersElements = this.map.getPane('tilePane').children;

        for (let i = 0; i < layersElements.length; i++) {
          if (layersElements[i].id === activeLayer.id) {
            layersElements[i].style.zIndex = datasetsLength - dataset.index;
          }
        }
      }
    }
  }

  // changeLayerOpacity(dataset) {
  //   const { layers } = this.props;
  //   const activeLayer = this.getActiveLayer(dataset, layers);
  //   const layer = this.mapLayers[activeLayer.id];

  //   if (layer) layer.setOpacity(dataset.opacity || 1);
  // }

  changeLayerOpacity(layer, dataset) {
    if (layer && layer.setOpacity) layer.setOpacity(dataset.opacity || 1);
  }

  addMapLayer(dataset, layer, datasetsLength) {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
    }

    const method = {
      // legacy/deprecated
      leaflet: this.addLeafletLayer,
      arcgis: this.addEsriLayer,
      // carto
      cartodb: this.addCartoLayer,
      carto: this.addCartoLayer,
      // wms
      wmsservice: this.addLeafletLayer,
      wms: this.addLeafletLayer,
      // arcgis
      featureservice: this.addEsriLayer,
      mapservice: this.addEsriLayer,
      tileservice: this.addEsriLayer,
      esrifeatureservice: this.addEsriLayer,
      esrimapservice: this.addEsriLayer,
      esritileservice: this.addEsriLayer,
      // geojson
      // geojson: this.addGeoJsonLayer,
      gee: this.addGeeLayer,
      nexgddp: this.addNexGDDPLayer
    }[layer.provider];

    if (method) {
      method.call(this, dataset, layer, datasetsLength);
    } else {
      throw Error(`${layer.provider} provider is not yet supported.`);
    }
  }

  /**
   * Adding support for Leaflet layers
   * @param {Object} dataset
   * @param {Object} layerSpec
   */

  addLeafletLayer(dataset, layerSpec, datasetsLength) {
    const layerData = layerSpec.layer_config;

    let layer;

    layerData.id = layerSpec.id;

    // Transforming data layer
    // TODO: improve this
    if (layerData.body.crs && L.CRS[layerData.body.crs]) {
      layerData.body.crs = L.CRS[layerData.body.crs.replace(':', '')];
      layerData.body.pane = 'tilePane';
    }

    switch (layerData.type) {
      case 'wms':
        layer = L.tileLayer.wms(layerData.url, layerData.body);
        break;
      case 'tileLayer':
        if (JSON.stringify(layerData.body).indexOf('style: "function') >= 0) {
          layerData.body.style = eval(`(${layerData.body.style})`);
        }
        layer = L.tileLayer(layerData.url, layerData.body);
        break;
      default:
        this.handleTileLoaded(layer);
        throw new Error('"type" specified in layer spec doesn`t exist');
    }

    if (layer) {
      const eventName = (layerData.type === 'wms' ||
      layerData.type === 'tileLayer') ? 'tileload' : 'load';
      layer.on(eventName, () => {
        this.handleTileLoaded(layer);
      });
      layer.on('tileerror', () => this.handleTileLoaded(layer));
      layer.addTo(this.map).setZIndex((datasetsLength + 1) - dataset.index);
      this.mapLayers[layerData.id] = layer;
      this.changeLayerOpacity(layer, dataset);
    }
  }

  /**
   * Adding support for ESRI layers
   * @param {Object} dataset
   * @param {Object} layerSpec
   */

  addEsriLayer(dataset, layerSpec, datasetsLength) {
    const layer = layerSpec.layer_config;
    layer.id = layerSpec.id;

    // Transforming layer
    const bodyStringified = JSON.stringify(layer.body || {})
      .replace(/"mosaic-rule":/g, '"mosaicRule":')
      .replace(/"mosaic_rule":/g, '"mosaicRule":')
      .replace(/"use-cors":/g, '"useCors":')
      .replace(/"use_cors":/g, '"useCors":');

    if (L[layer.type]) {
      // Transforming data layer
      // TODO: improve this
      if (layer.body.crs && L.CRS[layer.body.crs]) {
        layer.body.crs = L.CRS[layer.body.crs.replace(':', '')];
        layer.body.pane = 'tilePane';
      }

      let newLayer;

      switch (layer.type) {
        case 'wms':
          newLayer = L.tileLayer.wms(layer.url, layer.body);
          break;
        case 'tileLayer':
          if (JSON.stringify(layer.body).indexOf('style: "function') >= 0) {
            layer.body.style = eval(`(${layer.body.style})`);
          }
          newLayer = L.tileLayer(layer.url, layer.body);
          break;
        default:
          this.handleTileLoaded(layer);
          throw new Error('"type" specified in layer spec doesn`t exist');
      }

      if (newLayer) {
        const eventName = (layer.type === 'wms' ||
        layer.type === 'tileLayer') ? 'tileload' : 'load';
        layer.on(eventName, () => {
          this.handleTileLoaded(layer);
        });
        layer.on('tileerror', () => this.handleTileLoaded(layer));
        layer.addTo(this.map).setZIndex((datasetsLength + 1) - dataset.index);
        this.mapLayers[layer.id] = newLayer;
        this.changeLayerOpacity(newLayer, dataset);
      }
    } else if (L.esri[layer.type]) {
      const layerConfig = JSON.parse(bodyStringified);
      layerConfig.pane = 'tilePane';
      layerConfig.useCors = true; // forcing cors
      layerConfig.zIndex = (datasetsLength + 1) - dataset.index;
      if (layerConfig.style &&
        layerConfig.style.indexOf('function') >= 0) {
        layerConfig.style = eval(`(${layerConfig.style})`);
      }
      const newLayer = L.esri[layer.type](layerConfig);
      newLayer.addTo(this.map);
      newLayer.on('load', () => {
        this.handleTileLoaded(layer);
        const layerElement = this.map.getPane('tilePane').lastChild;
        layerElement.style.zIndex = (datasetsLength + 1) - dataset.index;
        layerElement.id = layer.id;
      });
      newLayer.on('requesterror', (e) => {
        this.handleTileLoaded(layer);
        console.error(e);
      });
      this.mapLayers[layer.id] = newLayer;
      this.changeLayerOpacity(newLayer, dataset);
    } else {
      throw new Error('"type" specified in layer spec doesn`t exist');
    }
  }

  /**
   * Adding support for carto layers
   * @param {Object} dataset
   * @param {Object} layerSpec
   */

  addCartoLayer(dataset, layerSpec, datasetsLength) {
    const layer = layerSpec.layer_config;
    layer.id = layerSpec.id;

    // Transforming layerSpec
    // TODO: change this please @ra
    const bodyStringified = JSON.stringify(layer.body || {})
      .replace(/"cartocss-version":/g, '"cartocss_version":')
      .replace(/"geom-column"/g, '"geom_column"')
      .replace(/"geom-type"/g, '"geom_type"')
      .replace(/"raster-band"/g, '"raster_band"');

    const request = new Request(`https://${layer.account}.carto.com/api/v1/map`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: bodyStringified
    });

    // add to the load layers lists before the fetch
    // to avoid multiples loads while the layer is loading
    // this.mapLayers[layer.id] = {};
    fetch(request)
      .then((res) => {
        if (!res.ok) {
          const error = new Error(res.statusText);
          error.response = res;
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        // we can switch off the layer while it is loading
        if (dataset.active) {
          const tileUrl = `${data.cdn_url.templates.https.url}/${layer.account}/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;
          const newLayer = L.tileLayer(tileUrl).addTo(this.map).setZIndex((datasetsLength + 1) - dataset.index);
          newLayer.index = dataset.index;
          newLayer.on('load', () => {
            this.changeLayerOpacity(layer, dataset);
            this.handleTileLoaded(layer);
          });
          newLayer.on('tileerror', () => {
            this.handleTileError(newLayer);
          });
          this.mapLayers[layer.id] = newLayer;
        } else {
          // delete this.mapLayers[layer.id];
        }
      })
      .catch((err) => {
        this.handleTileLoaded(layer);
        this.props.onTileError(layer.id);
        console.error(err);
      });
  }

  addNexGDDPLayer(dataset, layerSpec, datasetsLength) {
    const layerData = Object.assign({}, layerSpec);
    const tileUrl = `${config.apiUrlRW}/layer/${layerData.id}/tile/nexgddp/{z}/{x}/{y}`;
    const tileLayer = L.tileLayer(tileUrl);

    const eventName = (layerData.type === 'wms' ||
    layerData.type === 'tileLayer') ? 'tileload' : 'load';
    tileLayer.on(eventName, () => {
      this.handleTileLoaded(tileLayer);
    });
    tileLayer.on('tileerror', () => this.handleTileLoaded(tileLayer));
    tileLayer.addTo(this.map).setZIndex((datasetsLength + 1) - dataset.index);

    this.mapLayers[layerData.id] = tileLayer;
    this.changeLayerOpacity(tileLayer, dataset);
  }

  addGeeLayer(dataset, layerSpec, datasetsLength) {
    const layerData = Object.assign({}, layerSpec);
    const tileUrl = `${config.apiUrlRW}/layer/${layerData.id}/tile/gee/{z}/{x}/{y}`;
    const tileLayer = L.tileLayer(tileUrl);

    const eventName = (layerData.type === 'wms' ||
    layerData.type === 'tileLayer') ? 'tileload' : 'load';
    tileLayer.on(eventName, () => {
      this.handleTileLoaded(tileLayer);
    });
    tileLayer.on('tileerror', () => this.handleTileLoaded(tileLayer));
    tileLayer.addTo(this.map).setZIndex((datasetsLength + 1) - dataset.index);

    this.mapLayers[layerData.id] = tileLayer;
    this.changeLayerOpacity(tileLayer, dataset);
  }

  removeMapLayer(layerId) {
    this.map.removeLayer(this.mapLayers[layerId]);
    delete this.mapLayers[layerId];
  }

  handleTileLoaded() {
    this.setState({
      loading: false
    });
  }

  handleTileError(layer) {
    if (this.mapLayers[layer.id]) {
      this.removeMapLayer(layer);
    }
    this.props.onTileError(layer.id);
  }

  render() {
    return (<div className="c-explore-map">
      <div className="map" ref={(el) => (this.mapElement = el)} />
      { (this.state.loading && this.hasActiveLayers) && <LoadingSpinner /> }
      <Tooltip
        scroll
        text={this.state.tooltip.text}
        hidden={this.state.tooltip.hidden}
        position={this.state.tooltip.position}
        width={this.state.tooltip.width}
      />
    </div>);
  }
}

ExploreMap.contextTypes = {
  location: PropTypes.object
};

ExploreMap.propTypes = {
  enabledLayers: PropTypes.array,
  /**
   * Define the datasets data of the map
   */
  enabledDatasets: PropTypes.array,
  /**
   * Define the layers data of the map
   */
  layers: PropTypes.object,
  /**
   * Define the mapa data config
   */
  map: PropTypes.object.isRequired,
  /**
   * Define the function to update the map params
   */
  setMapParams: PropTypes.func.isRequired,
  /**
  * Define the function to handle a tile load error
  */
  onTileError: PropTypes.func.isRequired,
  /**
  * Define the function to get the geo data
  */
  setInteractionData: PropTypes.func.isRequired,
  /**
  * Define the interaction data: position, visibility and datasetId
  */
  interactionData: PropTypes.object,
  /**
  * Define the function to set visibility
  */
  setInteractionVisibility: PropTypes.func,
  /**
  * Define the function to set position
  */
  setInteractionPosition: PropTypes.func
};

export default ExploreMap;
