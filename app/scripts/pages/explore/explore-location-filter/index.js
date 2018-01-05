import { connect } from 'react-redux';
import * as exploreActions from '../explore-actions';
import * as reducers from './explore-location-filter-reducers';
import initialState from './explore-location-filter-initial-state';
import DatasetLocationFilter from './explore-location-filter-component';

const mapStateToProps = state => ({
  location: state.explorePage.coreDatasets.location
});

export { reducers, initialState };

const mapDispatchToProps = {
  ...exploreActions,
  setLocation: location => (dispatch) => {
    dispatch(exploreActions.setLocation(location));
    dispatch(exploreActions.updateURLParams());
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DatasetLocationFilter);
