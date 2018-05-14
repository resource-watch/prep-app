import { connect } from 'react-redux';
import * as exploreActions from 'pages/explore-export/explore-export-actions';
import * as reducers from 'pages/explore/explore-location-filter/explore-location-filter-reducers';
import initialState from 'pages/explore/explore-location-filter/explore-location-filter-initial-state';
import DatasetLocationFilter from 'pages/explore/explore-location-filter/explore-location-filter-component';

const mapStateToProps = state => ({ location: state.exploreExportPage.coreDatasets.location });

export { reducers, initialState };

export default connect(mapStateToProps, exploreActions)(DatasetLocationFilter);
