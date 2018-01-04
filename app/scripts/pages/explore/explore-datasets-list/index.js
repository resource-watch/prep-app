import { connect } from 'react-redux';
import Component from './explore-datasets-list-component';
import initialState from './explore-datasets-list-initial-state';
import * as exploreActions from '../explore-actions';
import * as reducers from './explore-datasets-list-reducers';
import { filteredDatasets, getSelectedDataset } from './explore-datasets-list-selector';

export { initialState, reducers };
// import { fetchDatasets, toggleDataset, toggleInfo, filterQuery } from 'components/datasets-list/datasets-list-action';

const mapStateToProps = state => ({
  datasets: filteredDatasets(state),
  status: state.explorePage.datasets.status,
  error: state.explorePage.datasets.error,
  isFetching: state.explorePage.datasets.isFetching,
  selectedDataset: getSelectedDataset(state)
});

// const mapDispatchToProps = dispatch => ({
//   fetchDatasets: () => dispatch(fetchDatasets()),
//   toggleDataset: dataset => dispatch(toggleDataset(dataset)),
//   toggleInfo: dataset => dispatch(toggleInfo(dataset)),
//   filterQuery: query => dispatch(filterQuery(query))
// });

export default connect(mapStateToProps, exploreActions)(Component);
