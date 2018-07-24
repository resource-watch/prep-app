import { connect } from 'react-redux';
import Component from './dataset-component';
import initialState from './dataset-initial-state';
import * as actions from './dataset-actions';
import * as reducers from './dataset-reducers';

export { initialState, actions, reducers };

const mapStateToProps = state => ({
  dataset: state.datasetPage.data,
  isFetching: state.datasetPage.isFetching,
  status: state.datasetPage.status,
  message: state.datasetPage.message
});

export default connect(mapStateToProps, actions)(Component);
