import Component from './core-datasets-list-component';
import { connect } from 'react-redux';
import { fetchDatasets, toggleDataset, toggleInfo } from 'components/datasets-list/datasets-list-action';
import { getCoreDatasets } from 'components/datasets-list/datasets-list-selector';

const mapStateToProps = state => ({
  datasets: getCoreDatasets(state),
  status: state.datasetsList.status,
  error: state.datasetsList.error,
  isFetching: state.datasetsList.isFetching
});

const mapDispatchToProps = dispatch => ({
  fetchDatasets: () => dispatch(fetchDatasets()),
  toggleDataset: dataset => dispatch(toggleDataset(dataset)),
  toggleInfo: dataset => dispatch(toggleInfo(dataset))
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
