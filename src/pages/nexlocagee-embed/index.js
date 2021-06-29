import { connect } from 'react-redux';

import { getDatasetByIdOrSlug } from 'actions/datasets';
import { fetchDataset } from '../dataset/dataset-actions';

import Component from './nexlocagee-embed-component';

const mapStateToProps = (state, { params }) => ({
  embed: true,
  datasetSlug: params.slug,
  dataset: state.datasets.details[params.slug]
});

const mapDispatchToProps = {
  // ...actions
  getDatasetByIdOrSlug,
  fetchDataset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
