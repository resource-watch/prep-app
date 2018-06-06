import { connect } from 'react-redux';
import * as exploreActions from 'pages/explore-embed/explore-embed-actions';
import * as reducers from 'pages/explore/explore-location-filter/explore-location-filter-reducers';
import initialState from 'pages/explore/explore-location-filter/explore-location-filter-initial-state';
import DatasetLocationFilter from 'pages/explore/explore-location-filter/explore-location-filter-component';

const mapStateToProps = state => ({ location: state.exploreEmbedPage.coreDatasets.location });

export { reducers, initialState };

export default connect(mapStateToProps, exploreActions)(DatasetLocationFilter);
