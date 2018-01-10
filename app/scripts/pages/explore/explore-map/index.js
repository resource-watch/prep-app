import { connect } from 'react-redux';
import * as exploreActions from '../explore-actions';
import * as reducers from './explore-map-reducers';
import initialState from './explore-map-initial-state';
import Component from './explore-map-component';
import { getActiveLayers } from './explore-map-selector';

const mapStateToProps = state => ({
  activeLayers: getActiveLayers(state),
  lat: state.explorePage.map.lat,
  lng: state.explorePage.map.lng,
  zoom: state.explorePage.map.zoom,
  basemap: state.explorePage.map.basemap,
  labels: state.explorePage.map.labels,
  boundaries: state.explorePage.map.boundaries
});

export { reducers, initialState };

export default connect(mapStateToProps, exploreActions)(Component);
