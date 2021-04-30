import React from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from '../Loading/LoadingSpinner';
import SimpleLegend from './SimpleLegend';

// if (L) L.esri = esri;

class SimpleMap extends React.Component {
  constructor() {
    super();
    this.state = { loading: false };
  }

  componentWillMount() {
    this.props.getLayerData(this.props.layerId);
  }

  componentDidMount() {
    this.initMap();
  }

  componentWillReceiveProps(props) {
    const layer = props.data[props.layerId] || false;
    if (layer) {
      this.updateMapPosition(layer);
      this.addMapLayer(layer);
    }
  }

  initMap() {
    const params = {
      zoom: 2,
      lat: 48.46038,
      lng: -123.889823
    };

    this.mapLayers = {};
    this.map = L.map(this.refs.map, {
      zoomControl: false,
      center: [+params.lat, +params.lng],
      zoom: +params.zoom,
      minZoom: 2,
      scrollWheelZoom: false
    });

    L.tileLayer(
      'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      { maxZoom: 18 }
    ).addTo(this.map, 1);
  }

  updateMapPosition(layer) {
    const center = layer.attributes.layerConfig.center;
    const zoom = layer.attributes.layerConfig.zoom;
    if (center && center.lat && center.lng && zoom) {
      this.map.setView(new L.LatLng(center.lat, center.lng), zoom);
    }
  }

  addMapLayer(layer) {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }

    switch (layer.attributes.provider) {
      case 'leaflet':
        this.addLeafletLayer(layer.attributes);
        break;
      case 'arcgis':
        this.addEsriLayer(layer.attributes);
        break;
      case 'cartodb':
        this.addCartoLayer(layer.attributes);
        break;
      default:
        break;
    }
  }

  /**
   * Adding support for Leaflet layers
   * @param {Object} layerSpec
   */
  addLeafletLayer(layerSpec) {
    const layerData = layerSpec.attributes.layerConfig;

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
   * @param {Object} layerSpec
   */
  addEsriLayer(layerSpec) {
    const layer = layerSpec.layerConfig;
    layer.id = layerSpec.id || this.props.layerId;

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
   * @param {Object} layerSpec
   */
  addCartoLayer(layerSpec) {
    const layer = layerSpec.attributes.layerConfig;
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
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: bodyStringified
    });

    // add to the load layers lists before the fetch
    // to avoid multiples loads while the layer is loading
    this.mapLayers[layer.id] = true;

    fetch(request)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        const error = new Error(res.statusText);
        error.response = res;
        throw error;
      })
      .then((data) => {
        const tileUrl = `https://${layer.account}.carto.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;
        this.mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this.map);
        this.mapLayers[layer.id].on('load', () => {
          this.handleTileLoaded(layer);
        });
        this.mapLayers[layer.id].on('tileerror', () => {
          this.handleTileError(layer);
        });
      })
      .catch((err) => {
        console.error('Request failed', err);
      });
  }

  handleTileLoaded() {
    this.setState({ loading: false });
  }

  handleTileError(layer) {
    console.error('Tile layer error', layer);
  }

  render() {
    let loading;
    const layer = this.props.data[this.props.layerId] || false;
    if (this.state.loading) {
      loading = <LoadingSpinner inner />;
    }

    return (<div className="c-simple-map">
      <div className="map" ref="map" />
      {layer &&
      <SimpleLegend layer={layer} />
      }
      {loading}
    </div>);
  }
}

SimpleMap.propTypes = {
  /**
   * Define the layers data
   */
  data: PropTypes.object.isRequired,
  /**
   * Define the id of the layer desired
   */
  layerId: PropTypes.string.isRequired,
  /**
   * Define the function to get the desired layer
   */
  getLayerData: PropTypes.func.isRequired
};

export default SimpleMap;
