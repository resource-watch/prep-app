import { connect } from 'react-redux';
import * as exploreActions from '../explore-actions';
import * as reducers from './explore-map-reducers';
import initialState from './explore-map-initial-state';
import Component from './explore-map-component';
import { getActiveLayers } from '../explore-datasets-list/explore-datasets-list-selector';

const mapStateToProps = state => ({
  activeLayers: getActiveLayers(state),
  basemap: state.explorePage.map.basemap,
  labels: state.explorePage.map.labels,
  boundaries: state.explorePage.map.boundaries
});

export { reducers, initialState };

export default connect(mapStateToProps, exploreActions)(Component);
