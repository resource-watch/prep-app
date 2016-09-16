import LoadingSpinner from '../Loading/LoadingSpinner';

import React from 'react';

class ExploreMap extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.initMap();
    this.setMapParams();
    this.setMapListeners();
    this.updateDatasets();

    // Fixing height of map
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }

  componentWillReceiveProps(props) {
    this.updateDatasets(props.data, props.layers);
  }

  setMapListeners() {
    this.map.on('dragend', () => {
      this.setMapParams();
    });
    this.map.on('zoomend', () => {
      this.setMapParams();
    });
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

  setMapParams() {
    this.props.setMapParams(this.getMapParams());
  }

  initMap() {
    const { params } = this.context.location;

    if (!params.zoom) params.zoom = 3;
    if (!params.lat) params.lat = 48.46038;
    if (!params.lng) params.lng = -123.889823;

    this.mapLayers = {};
    this.map = L.map(this.refs.map, {
      zoomControl: false,
      center: [+params.lat, +params.lng],
      zoom: +params.zoom,
      minZoom: 2
    });

    L.control.zoom({ position: this.props.map.zoomPosition }).addTo(this.map);

    L.tileLayer(
      this.props.map.basemap,
      this.props.map.basemapOptions
    ).addTo(this.map, 1);
  }

  updateDatasets(newData, newLayers) {
    const datasets = newData || this.props.data;
    const layers = newLayers || this.props.layers;
    this.hasActiveLayers = false;
    if (datasets.length) {
      datasets.forEach((dataset) => {
        if (dataset.layers.length) {
          this.updateMapLayer(dataset, layers, datasets.length);
        }
      });
    }
  }

  wasAlreadyAdded(dataset) {
    return this.mapLayers[dataset.layers[0].layer_id] || false;
  }

  hasChangedOrder(dataset) {
    return dataset.index !== undefined && dataset.index !== this.mapLayers[dataset.layers[0].layer_id].index || false;
  }

  hasChangedOpacity(dataset) {
    let hasChanged = (dataset && dataset.opacity !== this.mapLayers[dataset.layers[0].layer_id].options.opacity) || false;
    return hasChanged;
  }

  isLayerReady(dataset, layers) {
    if (dataset.layers && dataset.layers.length) {
      const layerId = dataset.layers[0].layer_id;
      return layers && layers[layerId] || false;
    }
    return false;
  }


  updateMapLayer(dataset, layers, datasetsLength) {
    const layerId = dataset.layers[0].layer_id;
    if (dataset.active) {
      if (this.isLayerReady(dataset, layers)) {
        if (!this.wasAlreadyAdded(dataset)) {
          this.hasActiveLayers = true;
          const layer = layers[layerId];
          this.addMapLayer(dataset, layer, datasetsLength);

        } else if (this.wasAlreadyAdded(dataset)) {
          if (this.hasChangedOrder(dataset)) {
            this.changeLayerOrder(dataset, datasetsLength);
          }
          if (this.hasChangedOpacity(dataset)) {
            this.changeLayerOpacity(dataset);
          }
        }
      }
    } else if (this.mapLayers[layerId]) {
      this.removeMapLayer(layerId);
    }
  }


  changeLayerOrder(dataset, datasetsLength) {
    const layer = this.mapLayers[dataset.layers[0].layer_id];
    if (dataset.index !== undefined && layer) {
      if (typeof layer.setZIndex === 'function') {
        layer.index = dataset.index;
        layer.setZIndex(datasetsLength - dataset.index);
      } else {
        const layerId = dataset.layers[0].layer_id;
        const layersElements = this.map.getPane('tilePane').children;
        for (let i = 0; i < layersElements.length; i++) {
          if (layersElements[i].id === layerId) {
            layersElements[i].style.zIndex = datasetsLength - dataset.index;
          }
        }

      }
    }
  }

  changeLayerOpacity(dataset) {
    const layer = this.mapLayers[dataset.layers[0].layer_id];
    layer.setOpacity(dataset.opacity);
  }

  addMapLayer(dataset, layer, datasetsLength) {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
    }
    switch (layer.attributes.provider) {
      case 'leaflet':
        this.addLeafletLayer(dataset, layer, datasetsLength);
        break;
      case 'arcgis':
        this.addEsriLayer(dataset, layer, datasetsLength);
        break;
      case 'cartodb':
        this.addCartoLayer(dataset, layer, datasetsLength);
        break;
      default:
        break;
    }
  }

  /**
   * Adding support for Leaflet layers
   * @param {Object} dataset
   * @param {Object} layerSpec
   */

  addLeafletLayer(dataset, layerSpec, datasetsLength) {
    const layerData = layerSpec.attributes['layer-config'];

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
        layer = new L.tileLayer.wms(layerData.url, layerData.body);
        break;
      case 'tileLayer':
        if (layerData.body.indexOf('style: "function') >= 0) {
          layerData.body.style = eval(`(${layerData.body.style})`);
        }
        layer = new L.tileLayer(layerData.url, layerData.body);
        break;
      default:
        throw new Error('"type" specified in layer spec doesn`t exist');
    }

    if (layer) {
      const eventName = (layerData.type === 'wms' ||
      layerData.type === 'tileLayer') ? 'tileload' : 'load';
      layer.on(eventName, () => {
        this.handleTileLoaded(layer);
      });
      layer.addTo(this.map).setZIndex(datasetsLength - dataset.index);
      this.mapLayers[layerData.id] = layer;
    }
  }

  /**
   * Adding support for ESRI layers
   * @param {Object} dataset
   * @param {Object} layerSpec
   */

  addEsriLayer(dataset, layerSpec, datasetsLength) {
    const layer = layerSpec.attributes['layer-config'];
    layer.id = layerSpec.id;

    // Transforming layer
    // TODO: change this please @ra
    const bodyStringified = JSON.stringify(layer.body || {})
      .replace(/"mosaic-rule":/g, '"mosaicRule":')
      .replace(/"use-cors"/g, '"useCors"');

    if (L.esri[layer.type]) {
      const layerConfig = JSON.parse(bodyStringified);
      layerConfig.pane = 'tilePane';
      if (layerConfig.style &&
        layerConfig.style.indexOf('function') >= 0) {
        layerConfig.style = eval(`(${layerConfig.style})`);
      }
      const newLayer = L.esri[layer.type](layerConfig);
      newLayer.on('load', () => {
        this.handleTileLoaded(layer);
        const layerElement = this.map.getPane('tilePane').lastChild;
        layerElement.style.zIndex = datasetsLength - dataset.index;
        layerElement.id = layer.id;
      });
      newLayer.addTo(this.map);
      this.mapLayers[layer.id] = newLayer;
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
    const layer = layerSpec.attributes['layer-config'];
    layer.id = layerSpec.id;

    // Transforming layerSpec
    // TODO: change this please @ra
    const bodyStringified = JSON.stringify(layer.body || {})
      .replace(/"cartocss-version":/g, '"cartocss_version":')
      .replace(/"geom-column"/g, '"geom_column"')
      .replace(/"geom-type"/g, '"geom_type"')
      .replace(/"raster-band"/g, '"raster_band"');

    const request = new Request(`https://${layer.account}.cartodb.com/api/v1/map`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: bodyStringified
    });

    // add to the load layers lists before the fetch
    // to avoid multiples loads while the layer is loading
    this.mapLayers[layer.id] = true;
    fetch(request)
      .then(res => {
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
          const tileUrl = `https://${layer.account}.cartodb.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;
          this.mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this.map).setZIndex(datasetsLength - dataset.index);
          this.mapLayers[layer.id].on('load', () => {
            this.handleTileLoaded(layer);
          });
          this.mapLayers[layer.id].on('tileerror', () => {
            this.handleTileError(layer);
          });
        } else {
          delete this.mapLayers[layer.id];
        }
      })
      .catch((err) => {
        console.error('Request failed', err);
        this.props.onTileError(layer.id);
      });
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
    let loading;
    if (this.state.loading && this.hasActiveLayers) {
      loading = <LoadingSpinner />;
    }
    return (<div className="c-explore-map">
      <div className="map" ref="map"></div>
      {loading}
    </div>);
  }
}

ExploreMap.contextTypes = {
  location: React.PropTypes.object
};

ExploreMap.propTypes = {
  /**
   * Define the datasets data of the map
   */
  data: React.PropTypes.array.isRequired,
  /**
   * Define the layers data of the map
   */
  layers: React.PropTypes.object,
  /**
   * Define the mapa data config
   */
  map: React.PropTypes.object.isRequired,
  /**
   * Define the function to update the map params
   */
  setMapParams: React.PropTypes.func.isRequired,
  /**
   * Define the function to handle a tile load erro
   */
  onTileError: React.PropTypes.func.isRequired
};

export default ExploreMap;
