import { connect } from 'react-redux';

import { getDatasetByIdOrSlug } from 'actions/datasets';

import Component from './nexgddp-embed-component';

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
