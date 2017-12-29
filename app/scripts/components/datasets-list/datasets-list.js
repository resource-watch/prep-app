import { connect } from 'react-redux';
import Component from './datasets-list-component';
import { fetchDatasets, toggleDataset, toggleInfo } from './datasets-list-action';
import { filteredDatasets } from './datasets-list-selector';

const mapStateToProps = state => ({
  datasets: filteredDatasets(state),
  status: state.datasetsList.status,
  error: state.datasetsList.error,
  isFetching: state.datasetsList.isFetching
});

const mapDispatchToProps = dispatch => ({
  fetchDatasets: () => dispatch(fetchDatasets()),
  toggleDataset: dataset => dispatch(toggleDataset(dataset)),
  toggleInfo: dataset => dispatch(toggleInfo(dataset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
