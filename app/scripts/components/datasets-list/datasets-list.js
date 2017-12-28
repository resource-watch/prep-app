import Component from './datasets-list-component';
import { connect } from 'react-redux';
import { fetchDatasets, toggleDataset } from './datasets-list-action';

const mapStateToProps = (state) => ({
  datasets: state.datasetsList.items,
  status: state.datasetsList.status,
  isFetching: state.datasetsList.isFetching
});

const mapDispatchToProps = dispatch => ({
  fetchDatasets: () => dispatch(fetchDatasets()),
  toggleDataset: (dataset) => dispatch(toggleDataset(dataset))
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
