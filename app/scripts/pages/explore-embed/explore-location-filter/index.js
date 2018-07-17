import { connect } from 'react-redux';
import * as exploreActions from 'pages/explore-embed/explore-embed-actions';
import * as reducers from 'pages/explore/explore-location-filter/explore-location-filter-reducers';
import initialState from 'pages/explore/explore-location-filter/explore-location-filter-initial-state';
import DatasetLocationFilter from 'pages/explore/explore-location-filter/explore-location-filter-component';
import { getCoreDatasetLocations } from 'pages/explore/explore-location-filter/explore-location-filter-selector';

const mapStateToProps = state => ({
  location: state.explorePage.coreDatasets.location,
  countries: getCoreDatasetLocations(state)
});

export { reducers, initialState };

export default connect(mapStateToProps, exploreActions)(DatasetLocationFilter);
