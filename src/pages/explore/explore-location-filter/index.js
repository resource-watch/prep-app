import { connect } from 'react-redux';
import * as exploreActions from '../explore-actions';
import * as reducers from './explore-location-filter-reducers';
import initialState from './explore-location-filter-initial-state';
import DatasetLocationFilter from './explore-location-filter-component';
import { getCoreDatasetLocations } from './explore-location-filter-selector';

const mapStateToProps = state => ({
  location: state.explorePage.coreDatasets.location,
  countries: getCoreDatasetLocations(state)
});

export { reducers, initialState };

export default connect(mapStateToProps, exploreActions)(DatasetLocationFilter);
