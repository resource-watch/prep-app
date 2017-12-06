import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';
import { getLayers } from 'selectors/nexgddptool';
import { setMarkerPosition } from 'actions/nexgddptool';

const mapDefaultOptions = {
  center: [20, -30],
  zoom: 3,
  minZoom: 3,
  maxZoom: 10,
  scrollWheelZoom: false,
  attributionControl: false,
  zoomControl: false
};

class SimpleMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.addMarker = this.addMarker.bind(this);
  }

  addMarker({ latlng }) {
    this.props.setMarkerPosition([latlng.lat, latlng.lng]);
  }

  render() {
    const { marker, layers } = this.props;
    const currentLayer = layers[0];

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: marker || mapDefaultOptions.center
    });

    return (
      <div className="c-tool-map">
        {currentLayer &&
          <div
            className="current-layer-label"
          >{new Date(layers[0].date).getFullYear()}</div>}

        <Map
          style={{ height: 440 }}
          {...mapOptions}
          onClick={this.addMarker}
        >
          <TileLayer
            url={config.basemapTileUrl}
          />
          {currentLayer && <TileLayer url={currentLayer.url} />}
          <ZoomControl position="bottomright" />
          { marker && <Marker position={marker} /> }
        </Map>
      </div>
    );
  }
}

SimpleMap.propTypes = {
  marker: PropTypes.array,
  layers: PropTypes.array,
  setMarkerPosition: PropTypes.func
};

const mapStateToProps = state => ({
  marker: state.nexgddptool.marker,
  layers: getLayers(state)
});

const mapDispatchToProps = dispatch => ({
  setMarkerPosition: (...params) => dispatch(setMarkerPosition(...params))
});


export default connect(mapStateToProps, mapDispatchToProps)(SimpleMap);
