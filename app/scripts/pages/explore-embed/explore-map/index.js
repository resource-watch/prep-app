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
  lat: state.exploreEmbedPage.map.lat,
  lng: state.exploreEmbedPage.map.lng,
  zoom: state.exploreEmbedPage.map.zoom,
  minZoom: state.exploreEmbedPage.map.minZoom,
  basemap: state.exploreEmbedPage.map.basemap,
  labels: state.exploreEmbedPage.map.labels,
  boundaries: state.exploreEmbedPage.map.boundaries,
  water: state.exploreEmbedPage.map.water,
  bbox: state.exploreEmbedPage.map.bbox,
  sidebar: state.exploreEmbedPage.sidebar
});

export { reducers, initialState };

export default connect(mapStateToProps, exploreActions)(Component);
