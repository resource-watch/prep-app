import Component from './explore-component';
import { connect } from 'react-redux';
import { setTab } from './explore-action';
import { fetchDatasets, toggleDataset, toggleInfo, filterQuery } from 'components/datasets-list/datasets-list-action';
import { getActiveDatasets, getSelectedDataset } from 'components/datasets-list/datasets-list-selector';

const mapStateToProps = (state) => ({
  datasets: state.datasetsList.items,
  selectedDataset: getSelectedDataset(state),
  activeDatasets: getActiveDatasets(state),
  datasetsList: state.datasetsList,
  currentTab: state.explorepage.tab
});

const mapDispatchToProps = dispatch => ({
  onChangeTab: (nextTab) => dispatch(setTab(nextTab)),
  fetchDatasets: () => dispatch(fetchDatasets()),
  toggleDataset: (dataset) => dispatch(toggleDataset(dataset)),
  toggleInfo: (dataset) => dispatch(toggleInfo(dataset)),
  filterQuery: (query) => dispatch(filterQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
