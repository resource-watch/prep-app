import { connect } from 'react-redux';
// import { getSelectedDataset } from 'components/datasets-list/datasets-list-selector';
import Component from './explore-component';
import initialState from './explore-initial-state';
import * as actions from './explore-actions';
import reducers from './explore-reducers';

export { initialState, actions, reducers, Component };

// import { fetchDatasets, toggleDataset, toggleInfo, filterQuery } from 'components/datasets-list/datasets-list-action';

const mapStateToProps = state => ({
  datasets: state.explorePage.datasets.items,
  // selectedDataset: getSelectedDataset(state),
  datasetsList: state.explorePage.datasets,
  currentTab: state.explorePage.tab
});

// const mapDispatchToProps = dispatch => ({
//   fetchDatasets: () => dispatch(fetchDatasets()),
//   toggleDataset: dataset => dispatch(toggleDataset(dataset)),
//   toggleInfo: dataset => dispatch(toggleInfo(dataset)),
//   filterQuery: query => dispatch(filterQuery(query))
// });

export default connect(mapStateToProps, actions)(Component);
