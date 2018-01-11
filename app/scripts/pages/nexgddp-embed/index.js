import { connect } from 'react-redux';

import { getDatasetByIdOrSlug } from 'actions/datasets';

import Component from './nexgddp-embed-component';
// import initialState from './explore-initial-state';
// import * as reducers from './explore-reducers';
//
// import * as actions from './explore-embed-actions';
// import { getSelectedDataset } from './explore-datasets-list/explore-datasets-list-selector';
//
// export { initialState, actions, reducers };

const mapStateToProps = (state, { params }) => ({
  embed: true,
  datasetSlug: params.slug,
  dataset: state.datasets.details[params.slug]
});

const mapDispatchToProps = {
  // ...actions
  getDatasetByIdOrSlug
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
