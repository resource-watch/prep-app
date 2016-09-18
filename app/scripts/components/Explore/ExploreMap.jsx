import LoadingSpinner from '../Loading/LoadingSpinner';

import React from 'react';
import Tooltip from '../Tooltip/Tooltip';

const tooltipBase = {
  hidden: true,
  position: {
    top: 0,
    left: 0
  },
  width: 'auto'
};

class ExploreMap extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      tooltip: tooltipBase
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

    if (props.interactionData.open && props.interactionData.info) {
      this.handleInteractivityTooltip(props.interactionData);
    }
  }

  setTooltipText(data) {
    let text = [];
    if (data) {
      const avoidedKeys = ['the_geom', 'the_geom_webmercator', 'cartodb_id'];
      const item = data.attributes ? data.attributes : data;

      Object.keys(item).map((key, i) => {
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

  tooltipText(text, data) {
    return (
      <div>
        <h3>Dataset info:</h3>
        {data ?
          <table className="table-data">
            <tbody>{text}</tbody>
          </table> :
          <p>- No data available.</p>}
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

    this.setState({tooltip});
  }

  setMapListeners() {
    this.map.on('dragend', () => {
      this.setMapParams();
    });
    this.map.on('zoomend', () => {
      this.setMapParams();
    });
    this.map.on('click', (e) => {
      this.handleMapClick(e);
    });
    this.map.on('blur', () => {
      this.clearTooltip();
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

  clearTooltip() {
    this.setState({ tooltip: tooltipBase });
    this.props.setInteractiveClose();
  }

  handleMapClick(e) {
    const { datasetId } = this.props.interactionData;

    this.clearTooltip();
    
    if (datasetId) {
      const TOLENRANCE = 2;
      const pointX = e.layerPoint.x;
      const pointY = e.layerPoint.y;
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

      this.props.setInteractionData(datasetId, geoJSON, { x: pointX, y: pointY });
    }
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
          this.updateMapLayer(dataset, layers);
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
    return dataset && dataset.opacity !== this.mapLayers[dataset.layers[0].layer_id].opacity || false;
  }

  isLayerReady(dataset, layers) {
    if (dataset.layers && dataset.layers.length) {
      const layerId = dataset.layers[0].layer_id;
      return layers && layers[layerId] || false;
    }
    return false;
  }

  updateMapLayer(dataset, layers) {
    const layerId = dataset.layers[0].layer_id;
    if (dataset.active) {
      if (this.isLayerReady(dataset, layers)) {
        if (!this.wasAlreadyAdded(dataset)) {
          this.hasActiveLayers = true;
          const layer = layers[layerId];
          this.addMapLayer(dataset, layer);
        } else if (this.wasAlreadyAdded(dataset)) {
          if (this.hasChangedOrder(dataset)) {
            this.changeLayerOrder(dataset);
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

  changeLayerOrder(dataset) {
    const layer = this.mapLayers[dataset.layers[0].layer_id];
    if (dataset.index !== undefined && layer && typeof layer.setZIndex === 'function') {
      layer.index = dataset.index;
      layer.setZIndex(dataset.index);
    }
  }

  changeLayerOpacity(dataset) {
    const layer = this.mapLayers[dataset.layers[0].layer_id];
    if (dataset.opacity !== undefined && layer && typeof layer.setOpacity === 'function') {
      setTimeout(() => {
        layer.setOpacity(dataset.opacity);
      }, 100);
      layer.opacity = dataset.opacity;
    }
  }

  addMapLayer(dataset, layer) {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
    }
    switch (layer.attributes.provider) {
      case 'leaflet':
        this.addLeafletLayer(dataset, layer);
        break;
      case 'arcgis':
        this.addEsriLayer(dataset, layer);
        break;
      case 'cartodb':
        this.addCartoLayer(dataset, layer);
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
  addLeafletLayer(dataset, layerSpec) {
    const layerData = layerSpec.attributes['layer-config'];

    let layer;

    layerData.id = layerSpec.id;

    // Transforming data layer
    // TODO: improve this
    if (layerData.body.crs && L.CRS[layerData.body.crs]) {
      layerData.body.crs = L.CRS[layerData.body.crs.replace(':', '')];
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
      layer.addTo(this.map);
      this.mapLayers[layerData.id] = layer;
    }
  }

  /**
   * Adding support for ESRI layers
   * @param {Object} dataset
   * @param {Object} layerSpec
   */
  addEsriLayer(dataset, layerSpec) {
    const layer = layerSpec.attributes['layer-config'];
    layer.id = layerSpec.id;

    // Transforming layer
    // TODO: change this please @ra
    const bodyStringified = JSON.stringify(layer.body || {})
      .replace(/"mosaic-rule":/g, '"mosaicRule":')
      .replace(/"use-cors"/g, '"useCors"');

    if (L.esri[layer.type]) {
      const layerConfig = JSON.parse(bodyStringified);
      if (layerConfig.style &&
        layerConfig.style.indexOf('function') >= 0) {
        layerConfig.style = eval(`(${layerConfig.style})`);
      }
      const newLayer = L.esri[layer.type](layerConfig);
      newLayer.on('load', () => {
        this.handleTileLoaded(layer);
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
  addCartoLayer(dataset, layerSpec) {
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
        if (res.ok) {
          return res.json();
        }
        const error = new Error(res.statusText);
        error.response = res;
        throw error;
      })
      .then((data) => {
        // we can switch off the layer while it is loading
        if (dataset.active) {
          const tileUrl = `https://${layer.account}.cartodb.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;
          this.mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this.map).setZIndex(dataset.index);
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
      <Tooltip
        ref="tagTooltip"
        text={this.state.tooltip.text}
        hidden={this.state.tooltip.hidden}
        position={this.state.tooltip.position}
        width={this.state.tooltip.width}
      />
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
  * Define the function to handle a tile load error
  */
  onTileError: React.PropTypes.func.isRequired,
  /**
  * Define the function to get the geo data
  */
  setInteractionData: React.PropTypes.func.isRequired,
  /**
  * Define the interaction data: position, visibility and datasetId
  */
  interactionData: React.PropTypes.object
};

export default ExploreMap;
