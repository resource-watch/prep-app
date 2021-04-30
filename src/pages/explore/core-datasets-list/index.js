import { connect } from 'react-redux';
import Component from './core-datasets-list-component';
import initialState from './core-datasets-list-initial-state';
import * as exploreActions from '../explore-actions';
import * as reducers from './core-datasets-list-reducers';
import { getCoreDatasets, getParsedCoreDatasets } from './core-datasets-list-selector';

const mapStateToProps = state => ({
  datasets: getCoreDatasets(state),
  coreDatasets: getParsedCoreDatasets(state),
  status: state.explorePage.datasets.status,
  error: state.explorePage.datasets.error,
  isFetching: state.explorePage.datasets.isFetching
});

export { initialState, reducers, Component };
export default connect(mapStateToProps, exploreActions)(Component);
