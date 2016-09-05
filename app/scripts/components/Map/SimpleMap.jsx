import LoadingSpinner from '../Loading/LoadingSpinner';

import React from 'react';

class SimpleMap extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
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
      this.addMapLayer(layer);
    }
  }

  initMap() {
    const params = {};

    if (!params.zoom) params.zoom = 2;
    if (!params.lat) params.lat = 48.46038;
    if (!params.lng) params.lng = -123.889823;

    this.mapLayers = {};
    this.map = L.map(this.refs.map, {
      zoomControl: false,
      center: [+params.lat, +params.lng],
      zoom: +params.zoom,
      minZoom: 2
    });

    L.tileLayer(
      'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      { maxZoom: 18 }
    ).addTo(this.map, 1);
  }

  addMapLayer(layer) {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
    }

    switch (layer.attributes.provider) {
      case 'leaflet':
        this.addLeafletLayer(layer);
        break;
      case 'arcgis':
        this.addEsriLayer(layer);
        break;
      case 'cartodb':
        this.addCartoLayer(layer);
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
    const layer = layerSpec.attributes['layer-config'];
    layer.id = layerSpec.id;

    // Transforming layer
    // TODO: change this please @ra
    const bodyStringified = JSON.stringify(layer.body || {})
      .replace(/"mosaic-rule":/g, '"mosaicRule":')
      .replace(/"use-cors"/g, '"useCors"');

    if (L.esri[layer.type]) {
      const layerConfig = JSON.parse(bodyStringified);
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
        const tileUrl = `https://${layer.account}.cartodb.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;
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
    this.setState({
      loading: false
    });
  }

  handleTileError(layer) {
    console.error('Tile layer error', layer);
  }

  render() {
    let loading;
    if (this.state.loading) {
      loading = <LoadingSpinner inner />;
    }
    return (<div className="c-simple-map">
      <div className="map" ref="map"></div>
      {loading}
    </div>);
  }
}

SimpleMap.propTypes = {
  /**
  * Define the layers data
  */
  data: React.PropTypes.object.isRequired,
  /**
  * Define the id of the layer desired
  */
  layerId: React.PropTypes.string.isRequired,
  /**
  * Define the function to get the desired layer
  */
  getLayerData: React.PropTypes.func.isRequired
};

export default SimpleMap;
