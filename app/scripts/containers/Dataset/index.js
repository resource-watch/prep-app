import { connect } from 'react-redux';
import DatasetDetailPage from '../../components/Dataset';

import { getDatasetDefaultWidget, getDatasetMetadata } from '../../actions/datasets';

const mapStateToProps = (state, { params, route }) => ({
  currentPage: route.path,
  datasetSlug: params.slug,
  data: state.datasets.metadatas[params.slug] || null,
  widget: state.datasets.widgets[params.slug] || null
});

const mapDispatchToProps = (dispatch) => ({
  getDatasetData: (slug) => {
    dispatch(getDatasetMetadata(slug));
    dispatch(getDatasetDefaultWidget(slug));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetailPage);
