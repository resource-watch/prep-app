import { connect } from 'react-redux';
import DataDetailPage from '../../components/pages/DataDetailPage';

import { getDatasetBySlug } from '../../actions/datasets';

const mapStateToProps = (state, { params, route }) => ({
  currentPage: route.path,
  datasetSlug: params.slug,
  data: state.datasets.detail[params.slug] || null
});

const mapDispatchToProps = (dispatch) => ({
  getDatasetBySlug: (slug) => dispatch(getDatasetBySlug(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataDetailPage);
