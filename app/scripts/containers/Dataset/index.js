import { connect } from 'react-redux';
import DatasetDetailPage from '../../components/Dataset';

import { getDatasetById } from '../../actions/datasets';

const mapStateToProps = (state, { params, route }) => ({
  currentPage: route.path,
  datasetSlug: params.slug,
  data: state.datasets.details[params.slug] || null,
  widgets: state.datasets.widgets[params.slug] || []
});

const mapDispatchToProps = dispatch => ({
  getDatasetData: (slug) => {
    dispatch(getDatasetById(slug, ['metadata', 'widget']));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetailPage);
