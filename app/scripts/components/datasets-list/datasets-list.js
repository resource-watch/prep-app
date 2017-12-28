import Component from './datasets-list-component';
import { connect } from 'react-redux';
import { fetchDatasets, toggleDataset, toggleInfo } from './datasets-list-action';

const mapStateToProps = (state) => ({
  datasets: state.datasetsList.items,
  status: state.datasetsList.status,
  error: state.datasetsList.error,
  isFetching: state.datasetsList.isFetching
});

const mapDispatchToProps = dispatch => ({
  fetchDatasets: () => dispatch(fetchDatasets()),
  toggleDataset: (dataset) => dispatch(toggleDataset(dataset)),
  toggleInfo: (dataset) => dispatch(toggleInfo(dataset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
