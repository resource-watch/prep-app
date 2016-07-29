import LoadingSpinner from '../commons/LoadingSpinner';

import React from 'react';

class DataMap extends React.Component {
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
      scrollWheelZoom: false,
      zoomControl: false,
      center: [+params.lat, +params.lng],
      zoom: +params.zoom
    });
    L.control.zoom({ position: this.props.map.zoomPosition }).addTo(this.map);

    L.tileLayer(
      this.props.map.basemap,
      { maxZoom: 18 }
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
      if (!this.wasAlreadyAdded(dataset) && this.isLayerReady(dataset, layers)) {
        this.hasActiveLayers = true;
        const layer = layers[layerId];
        this.addMapLayer(dataset, layer);
      }
    } else if (this.mapLayers[layerId]) {
      this.removeMapLayer(layerId);
    }
  }

  addMapLayer(dataset, layer) {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
    }
    switch (layer.attributes.provider) {
      case 'cartodb':
        this.addCartoLayer(dataset, layer);
        break;
      default:
        break;
    }
  }

  addCartoLayer(dataset, apiLayer) {
    const layer = apiLayer.attributes['layer-config'];
    layer.id = apiLayer.id;
    const request = new Request(`https://${layer.account}.cartodb.com/api/v1/map`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        layers: [{
          user_name: layer.account,
          type: 'cartodb',
          options: {
            sql: layer.query,
            cartocss: layer.cartocss,
            cartocss_version: '2.3.0'
          }
        }]
      })
    });
    // add to the load layers lists before the fetch
    // to avoid multiples loads while the layer is loading
    this.mapLayers[layer.id] = true;

    fetch(request)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(res.statusText);
      })
      .then((data) => {
        // we can switch off the layer while it is loading
        if (dataset.active) {
          const tileUrl = `https://${layer.account}.cartodb.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;
          this.mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this.map, 1);
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
      .catch(() => this.props.onTileError(layer.id));
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
    return (<div className="c-data-map">
      <div className="map" ref="map"></div>
      {loading}
    </div>);
  }
}

DataMap.contextTypes = {
  location: React.PropTypes.object
};

DataMap.propTypes = {
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

export default DataMap;
