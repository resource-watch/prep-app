import { connect } from 'react-redux';
import * as reducers from 'pages/explore/explore-map/explore-map-reducers';
import initialState from 'pages/explore/explore-map/explore-map-initial-state';
import Component from 'pages/explore/explore-map/explore-map-component';

import * as exploreActions from '../explore-embed-actions';

// Selector
import { getActiveLayers, getActiveLayersForMap } from './explore-map-selector';

const mapStateToProps = state => ({
  embed: true,
  activeLayers: getActiveLayers(state),
  activeLayersForMap: getActiveLayersForMap(state),
  lat: state.explorePage.map.lat,
  lng: state.explorePage.map.lng,
  zoom: state.explorePage.map.zoom,
  minZoom: state.explorePage.map.minZoom,
  basemap: state.explorePage.map.basemap,
  labels: state.explorePage.map.labels,
  boundaries: state.explorePage.map.boundaries,
  water: state.explorePage.map.water,
  bbox: state.explorePage.map.bbox,
  sidebar: state.explorePage.sidebar
});

export { reducers, initialState };

export default connect(mapStateToProps, exploreActions)(Component);
