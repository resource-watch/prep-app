import React from 'react';

class Map extends React.Component {
  componentDidMount() {
    this.map = L.map(this.refs.map, {
      scrollWheelZoom: false,
      center: [48.246038, -122.589823],
      zoom: 8,
    });

    // adding basemap
    L.tileLayer(this.props.data.tile, {
      maxZoom: 18
    }).addTo(this.map, 1);
  }

  render() {
    return <div className="c-map" ref="map"> </div>;
  }
}

Map.propTypes = {
  /**
  * Define the layers data of the map
  */
  data: React.PropTypes.any.isRequired,
};

export default Map;
