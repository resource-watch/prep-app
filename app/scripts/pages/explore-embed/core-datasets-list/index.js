import { connect } from 'react-redux';
import Component from 'pages/explore/core-datasets-list/core-datasets-list-component';
import initialState from 'pages/explore/core-datasets-list/core-datasets-list-initial-state';
import * as reducers from 'pages/explore/core-datasets-list/core-datasets-list-reducers';
import * as exploreActions from '../explore-embed-actions';
import { getCoreDatasets, getParsedCoreDatasets } from './core-datasets-list-selector';

const mapStateToProps = state => ({
  datasets: getCoreDatasets(state),
  coreDatasets: getParsedCoreDatasets(state),
  error: state.exploreEmbedPage.datasets.error,
  isFetching: state.exploreEmbedPage.datasets.isFetching
});

export { initialState, reducers, Component };
export default connect(mapStateToProps, exploreActions)(Component);
