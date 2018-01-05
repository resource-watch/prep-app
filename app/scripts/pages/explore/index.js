import { connect } from 'react-redux';
import { getSelectedDataset } from './explore-datasets-list/explore-datasets-list-selector';
import Component from './explore-component';
import initialState from './explore-initial-state';
import * as actions from './explore-actions';
import reducers from './explore-reducers';

export { initialState, actions, reducers, Component };

const mapStateToProps = state => ({
  routing: state.routing,
  datasets: state.explorePage.datasets.items,
  selectedDataset: getSelectedDataset(state),
  datasetsList: state.explorePage.datasets,
  currentTab: state.explorePage.tab
});

const mapDispatchToProps = {
  ...actions,
  setTab: tab => (dispatch) => {
    dispatch(actions.setTab(tab));
    dispatch(actions.updateURLParams());
  },
  filterQuery: query => (dispatch) => {
    dispatch(actions.filterQuery(query));
    dispatch(actions.updateURLParams());
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
