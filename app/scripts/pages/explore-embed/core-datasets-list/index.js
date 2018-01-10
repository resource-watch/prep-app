import { connect } from 'react-redux';
import Component from 'pages/explore/core-datasets-list/core-datasets-list-component';
import initialState from 'pages/explore/core-datasets-list/core-datasets-list-initial-state';
import * as exploreActions from '../explore-embed-actions';
import { getCoreDatasets } from './core-datasets-list-selector';

const mapStateToProps = state => ({
  datasets: getCoreDatasets(state),
  status: state.explorePage.datasets.status,
  error: state.explorePage.datasets.error,
  isFetching: state.explorePage.datasets.isFetching
});

export { initialState, Component };
export default connect(mapStateToProps, exploreActions)(Component);
