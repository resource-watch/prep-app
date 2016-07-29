import { connect } from 'react-redux';
import DataDetailPage from '../../components/pages/DataDetailPage';

import { getDatasetDefaultWidget } from '../../actions/datasets';

const mapStateToProps = (state, { params, route }) => ({
  currentPage: route.path,
  datasetSlug: params.slug,
  data: state.datasets.details[params.slug] || null
});

const mapDispatchToProps = (dispatch) => ({
  getDatasetData: (slug) => dispatch(getDatasetDefaultWidget(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataDetailPage);
