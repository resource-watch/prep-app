import { connect } from 'react-redux';
import * as exploreActions from 'pages/explore-embed/explore-embed-actions';
import * as reducers from 'pages/explore/explore-map/explore-map-reducers';
import initialState from 'pages/explore/explore-map/explore-map-initial-state';
import Component from 'pages/explore/explore-map/explore-map-component';

// Selector
import { getActiveLayers } from './explore-map-selector';

const mapStateToProps = state => ({
  embed: true,
  activeLayers: getActiveLayers(state),
  basemap: state.exploreEmbedPage.map.basemap,
  labels: state.exploreEmbedPage.map.labels,
  boundaries: state.exploreEmbedPage.map.boundaries
});

export { reducers, initialState };

export default connect(mapStateToProps, exploreActions)(Component);
