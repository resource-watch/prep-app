import { connect } from 'react-redux';

import Component from './nexgddp-embed-component';
// import initialState from './explore-initial-state';
// import * as reducers from './explore-reducers';
//
// import * as actions from './explore-embed-actions';
// import { getSelectedDataset } from './explore-datasets-list/explore-datasets-list-selector';
//
// export { initialState, actions, reducers };

const mapStateToProps = (state, ownProps) => ({
  embed: true,
  dataset: ownProps.params.slug
});

const mapDispatchToProps = {
  // ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
