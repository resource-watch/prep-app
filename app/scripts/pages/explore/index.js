import { connect } from 'react-redux';
import { getSelectedDataset } from './explore-datasets-list/explore-datasets-list-selector';
import Component from './explore-component';
import initialState from './explore-initial-state';
import * as actions from './explore-actions';
import * as reducers from './explore-reducers';

export { initialState, actions, reducers };

const mapStateToProps = state => ({
  routing: state.routing,
  datasets: state.explorePage.datasets.items,
  selectedDataset: getSelectedDataset(state),
  datasetsList: state.explorePage.datasets,
  currentTab: state.explorePage.tab
});

export default connect(mapStateToProps, actions)(Component);
