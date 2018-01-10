import { connect } from 'react-redux';

import Component from './explore-embed-component';
import initialState from './explore-initial-state';
import * as reducers from './explore-reducers';

import * as actions from './explore-embed-actions';
import { getSelectedDataset } from './explore-datasets-list/explore-datasets-list-selector';

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
