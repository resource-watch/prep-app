import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/Loading/LoadingSpinner';
import layerManager from './layer-manager';
import isEqual from 'lodash/isEqual';

const defaultMapOptions = {
  zoom: 3,
  center: [48.46038, -123.889823],
  zoomControl: false,
  zoomControlPosition: 'bottomright',
  minZoom: 2
};

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.addedLayers = []; // cache layers
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentDidMount() {
    this.initMap();
    this.setEvents();
    this.setBasemap();
    this.setLabels();
    this.setBoundaries();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.basemap !== this.props.basemap) this.setBasemap();
    if (prevProps.labels !== this.props.labels) this.setLabels();
    if (prevProps.boundaries !== this.props.boundaries) this.setBoundaries();
    if (!isEqual(prevProps.layers, this.props.layers)) this.toggleLayers();
  }

  setEvents() {
    if (this.props.onChange && typeof this.props.onChange === 'function') {
      this.map.on('zoomend', this.triggerChange);
      this.map.on('moveend', this.triggerChange);
    }
  }

  setBasemap() {
    if (this.basemap) this.map.removeLayer(this.basemap);
    const { basemap } = this.props;
    if (basemap) {
      this.basemap = L.tileLayer(basemap.value, { ...basemap.options, zIndex: 0 });
      this.map.addLayer(this.basemap);
    }
  }

  setLabels() {
    if (this.labels) this.map.removeLayer(this.labels);
    const { labels } = this.props;
    if (labels) {
      this.labels = L.tileLayer(labels.value, { ...labels.options, zIndex: 10001 });
      this.map.addLayer(this.labels);
    }
  }

  setBoundaries() {
    if (this.boundaries) this.map.removeLayer(this.boundaries);
    const { boundaries } = this.props;
    if (boundaries && Object.keys(boundaries).length) {
      this.boundaries = L.tileLayer(boundaries.value, { ...boundaries.options, zIndex: 10000 });
      this.map.addLayer(this.boundaries);
    }
  }

  triggerChange() {
    const center = this.map.getCenter();
    this.props.onChange({ zoom: this.map.getZoom(), lat: center.lat, lng: center.lng });
  }

  initMap() {
    const mapOptions = Object.assign({}, defaultMapOptions, this.props.mapOptions);
    this.map = L.map(this.mapElement, mapOptions);
    if (!mapOptions.zoomControl) L.control.zoom({ position: mapOptions.zoomControlPosition }).addTo(this.map);
  }

  toggleLayers() {
    if (this.addedLayers.length) {
      this.addedLayers.forEach(layer => this.map.removeLayer(layer));
    }

    this.addedLayers = [];

    this.props.layers.forEach((layerSpec) => {
      layerManager(layerSpec)
        .then((layer) => {
          this.addedLayers.push(layer);
          this.map.addLayer(layer);
        });
    });
  }

  render() {
    return (
      <div className="map" ref={(el) => { this.mapElement = el; }}>
        {this.state.loading && <LoadingSpinner />}
        { this.props.children }
      </div>
    );
  }
}

Map.propTypes = {
  mapOptions: PropTypes.object,
  basemap: PropTypes.object,
  labels: PropTypes.object,
  boundaries: PropTypes.object,
  children: PropTypes.any,
  layers: PropTypes.array,
  onChange: PropTypes.func
};

Map.defaultProps = {};

export default Map;
