import Component from './explore-component';
import { connect } from 'react-redux';
import { setTab } from './explore-action';
import { fetchDatasets, toggleDataset, toggleInfo } from 'components/datasets-list/datasets-list-action';
import { getActiveDatasets } from 'components/datasets-list/datasets-list-selector';

const mapStateToProps = (state) => ({
  activeDatasets: getActiveDatasets(state),
  datasetsList: state.datasetsList,
  currentTab: state.explorepage.tab
});

const mapDispatchToProps = dispatch => ({
  onChangeTab: (nextTab) => dispatch(setTab(nextTab)),
  fetchDatasets: () => dispatch(fetchDatasets()),
  toggleDataset: (dataset) => dispatch(toggleDataset(dataset)),
  toggleInfo: (dataset) => dispatch(toggleInfo(dataset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
