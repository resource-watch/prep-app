import { connect } from 'react-redux';
import DatasetDetailPage from '../../components/Dataset';

import { getDatasetById } from '../../actions/datasets';

const mapStateToProps = (state, { params, route }) => ({
  currentPage: route.path,
  datasetId: params.id,
  data: state.datasets.details[params.id] || null,
  widgets: state.datasets.widgets[params.id] || []
});

const mapDispatchToProps = dispatch => ({
  getDatasetData: (id) => {
    dispatch(getDatasetById(id, ['metadata', 'widget']));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetailPage);
