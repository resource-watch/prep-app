import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, TileLayer, ZoomControl, Marker } from 'react-leaflet';

// Redux
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

class ToggleMap extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.toggleLayer = this.toggleLayer.bind(this);
  }

  toggleLayer() {
    this.setState({ index: this.state.index === 0 ? 1 : 0 });
  }

  render() {
    const { marker, layers, range1Selection, range2Selection } = this.props;

    // It will change center of map on marker location
    const mapOptions = Object.assign({}, mapDefaultOptions, {
      center: marker || mapDefaultOptions.center
    });

    const currentLayer = layers[this.state.index];

    return (
      <div className="c-tool-map">
        <button
          className="c-button -filled -secondary-color switch-button"
          onClick={this.toggleLayer}
        >Switch</button>
        <div
          className="current-layer-label -right"
        >
          {this.state.index === 0 ? range1Selection.label : range2Selection.label}
        </div>
        <Map
          style={{ height: 440 }}
          {...mapOptions}
          onClick={({ latlng }) => this.props.setMarkerPosition([latlng.lat, latlng.lng])}
        >
          <TileLayer
            url={config.basemapTileUrl}
          />
          {currentLayer && <TileLayer url={currentLayer.url} />}
          <ZoomControl position="bottomright" />
          { marker && <Marker position={marker} icon={L.divIcon({ className: 'map-marker' })} /> }
        </Map>
      </div>
    );
  }
}

ToggleMap.propTypes = {
  mapOptions: PropTypes.object,
  marker: PropTypes.array,
  layers: PropTypes.array,
  range1Selection: PropTypes.object,
  range2Selection: PropTypes.object,
  setMarkerPosition: PropTypes.func
};

const mapStateToProps = state => ({
  marker: state.nexgddptool.marker,
  layers: getLayers(state),
  range1Selection: state.nexgddptool.range1.selection,
  range2Selection: state.nexgddptool.range2.selection
});

const mapDispatchToProps = dispatch => ({
  setMarkerPosition: (...params) => dispatch(setMarkerPosition(...params))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleMap);
