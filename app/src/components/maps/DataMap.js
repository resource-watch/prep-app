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
    this.updateLayers();
  }

  componentWillReceiveProps() {
    this.updateLayers();
  }

  initMap() {
    this.mapLayers = {};
    this.map = L.map(this.refs.map, {
      scrollWheelZoom: false,
      zoomControl: false,
      center: [48.46038, -123.889823],
      zoom: 3,
    });
    L.control.zoom({ position: 'topright' }).addTo(this.map);

    L.tileLayer(
      'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      { maxZoom: 18 }
    ).addTo(this.map, 1);
  }

  updateLayers() {
    this.hasActiveLayers = false;
    if (this.props.data.length) {
      this.props.data.forEach((layer) => {
        this.updateMapLayer(layer);
      });
    }
  }

  updateMapLayer(layer) {
    if (layer.active && !this.mapLayers[layer.id]) {
      this.hasActiveLayers = true;
      this.addMapLayer(layer);
    } else if (!layer.active && this.mapLayers[layer.id]) {
      this.removeMapLayer(layer);
    }
  }

  addMapLayer(layer) {
    if (!this.state.loading) {
      this.setState({
        loading: true
      });
    }
    switch (layer.mapType) {
      case 'ArcGISImageMapLayer':
        this.addArcgisImageLayer(layer);
        break;
      case 'ArcGISTiledMapLayer':
        this.addArcgisTileLayer(layer);
        break;
      case 'CartoLayer':
        this.addCartoLayer(layer);
        break;
      default:
        break;
    }
  }

  addArcgisImageLayer(layer) {
    this.mapLayers[layer.id] = L.esri.imageMapLayer({
      url: layer.url,
      mosaicRule: layer.mosaicRule,
      useCors: false
    }).addTo(this.map);
    this.mapLayers[layer.id].on('load', () => {
      this.handleTileLoaded(layer);
    });
  }

  addArcgisTileLayer(layer) {
    this.mapLayers[layer.id] = L.esri.tiledMapLayer({
      url: layer.url,
      mosaicRule: layer.mosaicRule,
      useCors: false
    }).addTo(this.map);
    this.mapLayers[layer.id].on('load', () => {
      this.handleTileLoaded(layer);
    });
  }

  addCartoLayer(layer) {
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

    fetch(request)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return this.handleTileError(layer);
      })
      .then((data) => {
        // we can switch off the layer while it is loading
        if (layer.active) {
          const tileUrl = `https://${layer.account}.cartodb.com/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;
          this.mapLayers[layer.id] = L.tileLayer(tileUrl).addTo(this.map, 1);
          this.mapLayers[layer.id].on('load', () => {
            this.handleTileLoaded(layer);
          });
          this.mapLayers[layer.id].on('tileerror', () => {
            this.handleTileError(layer);
          });
        }
      })
      .catch(() => this.props.onTileError(layer.id));
  }

  removeMapLayer(layer) {
    this.map.removeLayer(this.mapLayers[layer.id]);
    this.mapLayers[layer.id] = null;
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

DataMap.propTypes = {
  /**
  * Define the layers data of the map
  */
  data: React.PropTypes.array.isRequired,
  /**
  * Define the function to handle a tile load erro
  */
  onTileError: React.PropTypes.func.isRequired,
};

export default DataMap;
