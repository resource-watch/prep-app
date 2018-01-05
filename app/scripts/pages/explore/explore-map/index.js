import { connect } from 'react-redux';
import * as exploreActions from '../explore-actions';
import * as reducers from './explore-map-reducers';
import initialState from './explore-map-initial-state';
import Component from './explore-map-component';

const mapStateToProps = state => ({
  basemap: state.explorePage.map.basemap,
  labels: state.explorePage.map.labels,
  boundaries: state.explorePage.map.boundaries
});

const mapDispatchToProps = dispatch => ({
  ...exploreActions,
  setBasemap: (basemap) => {
    dispatch(exploreActions.setBasemap(basemap));
    dispatch(exploreActions.updateURLParams());
  },
  setLabels: (labels) => {
    dispatch(exploreActions.setLabels(labels));
    dispatch(exploreActions.updateURLParams());
  },
  setBoundaries: (boundaries) => {
    dispatch(exploreActions.setBoundaries(boundaries));
    dispatch(exploreActions.updateURLParams());
  },
  setMapParams: (mapParams) => {
    dispatch(exploreActions.setMapParams(mapParams));
    dispatch(exploreActions.updateURLParams());
  }
});

export { reducers, initialState };

export default connect(mapStateToProps, mapDispatchToProps)(Component);
