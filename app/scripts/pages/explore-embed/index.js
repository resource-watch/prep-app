import { connect } from 'react-redux';

import Component from './explore-embed-component';
import initialState from 'pages/explore/explore-initial-state';
import * as actions from 'pages/explore/explore-actions';
import * as reducers from 'pages/explore/explore-reducers';

import { getSelectedDataset } from 'pages/explore/explore-datasets-list/explore-datasets-list-selector';

export { initialState, actions, reducers };

const mapStateToProps = state => ({
  embed: true,
  routing: state.routing,
  datasets: state.exploreEmbedPage.datasets.items,
  selectedDataset: getSelectedDataset(state),
  datasetsList: state.exploreEmbedPage.datasets,
  currentTab: state.exploreEmbedPage.tab
});

export default connect(mapStateToProps, actions)(Component);
