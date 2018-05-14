import { connect } from 'react-redux';

import Component from './explore-export-component';
import initialState from './explore-initial-state';
import * as reducers from './explore-reducers';

import * as actions from './explore-export-actions';
import { getSelectedDataset } from './explore-datasets-list/explore-datasets-list-selector';

export { initialState, actions, reducers };

const mapStateToProps = state => ({
  embedExport: true,
  sidebar: state.exploreExportPage.sidebar,
  routing: state.routing,
  datasets: state.exploreExportPage.datasets.items,
  selectedDataset: getSelectedDataset(state),
  datasetsList: state.exploreExportPage.datasets,
  currentTab: state.exploreExportPage.tab
});

export default connect(mapStateToProps, actions)(Component);
