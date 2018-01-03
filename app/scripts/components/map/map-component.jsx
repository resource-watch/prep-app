import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/Loading/LoadingSpinner';

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
  }

  componentDidMount() {
    this.initMap();
    // this.setBasemap();
  }

  // componentDidUpdate() {
  //   console.log(this.props.activeDatasets);
  // }

  setBasemap() {
    if (this.basemap) this.map.removeLayer(this.basemap);
    const { basemap } = this.props;
    this.basemap = L.tileLayer(basemap.value, basemap.options);
    this.map.addLayer(this.basemap);
  }

  initMap() {
    const mapOptions = Object.assign({}, defaultMapOptions, this.props.mapOptions);
    this.map = L.map(this.mapElement, mapOptions);
    if (!mapOptions.zoomControl) L.control.zoom({ position: mapOptions.zoomControlPosition }).addTo(this.map);
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
  children: PropTypes.any,
  activeDatasets: PropTypes.array
};

Map.defaultProps = {};

export default Map;
