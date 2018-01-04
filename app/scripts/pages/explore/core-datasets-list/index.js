import { connect } from 'react-redux';
import Component from './core-datasets-list-component';
import initialState from './core-datasets-list-initial-state';
// import { fetchDatasets, toggleDataset, toggleInfo } from '../explore-datasets-list/explore-datasets-list-actions';
import { getCoreDatasets } from './core-datasets-list-selector';

const mapStateToProps = state => ({
  datasets: getCoreDatasets(state),
  status: state.explorePage.datasets.status,
  error: state.explorePage.datasets.error,
  isFetching: state.explorePage.datasets.isFetching
});

const mapDispatchToProps = dispatch => ({
  // fetchDatasets: () => dispatch(fetchDatasets()),
  // toggleDataset: dataset => dispatch(toggleDataset(dataset)),
  // toggleInfo: dataset => dispatch(toggleInfo(dataset))
});

export { initialState, Component };
export default connect(mapStateToProps, mapDispatchToProps)(Component);
