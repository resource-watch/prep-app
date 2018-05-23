import { connect } from 'react-redux';

import Component from 'pages/explore/explore-datasets-list/explore-datasets-list-component';
import initialState from 'pages/explore/explore-datasets-list/explore-datasets-list-initial-state';
import * as reducers from 'pages/explore/explore-datasets-list/explore-datasets-list-reducers';

import * as exploreActions from '../explore-export-actions';
import { filteredDatasets, getSelectedDataset } from './explore-datasets-list-selector';


export { initialState, reducers };

const mapStateToProps = state => ({
  datasets: filteredDatasets(state),
  status: state.exploreExportPage.datasets.status,
  error: state.exploreExportPage.datasets.error,
  isFetching: state.exploreExportPage.datasets.isFetching,
  selectedDataset: getSelectedDataset(state)
});

export default connect(mapStateToProps, exploreActions)(Component);
