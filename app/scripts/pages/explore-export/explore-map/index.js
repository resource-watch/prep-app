import { connect } from 'react-redux';
import * as reducers from 'pages/explore/explore-map/explore-map-reducers';
import initialState from 'pages/explore/explore-map/explore-map-initial-state';
import Component from 'pages/explore/explore-map/explore-map-component';

import * as exploreActions from '../explore-export-actions';

// Selector
import { getActiveLayers, getActiveLayersForMap } from './explore-map-selector';

const mapStateToProps = state => ({
  embedExport: true,
  activeLayers: getActiveLayers(state),
  activeLayersForMap: getActiveLayersForMap(state),
  lat: state.exploreExportPage.map.lat,
  lng: state.exploreExportPage.map.lng,
  zoom: state.exploreExportPage.map.zoom,
  minZoom: state.exploreExportPage.map.minZoom,
  basemap: state.exploreExportPage.map.basemap,
  labels: state.exploreExportPage.map.labels,
  boundaries: state.exploreExportPage.map.boundaries,
  water: state.exploreExportPage.map.water,
  bbox: state.exploreExportPage.map.bbox,
  sidebar: state.exploreExportPage.sidebar
});

export { reducers, initialState };

export default connect(mapStateToProps, exploreActions)(Component);
