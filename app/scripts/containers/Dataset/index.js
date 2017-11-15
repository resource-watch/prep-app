import { connect } from 'react-redux';
import DatasetDetailPage from '../../components/Dataset';

import { getDatasetById } from '../../actions/datasets';

import { toggleModal, setModalOptions } from '../../editor/redactions/modal';

const mapStateToProps = (state, { params, route }) => ({
  currentPage: route.path,
  datasetSlug: params.slug,
  data: state.datasets.details[params.slug] || null,
  widgets: state.datasets.widgets[params.slug] || [],
  modal: state.modalEditor
});

const mapDispatchToProps = dispatch => ({
  getDatasetData: (slug) => {
    dispatch(getDatasetById(slug, ['metadata', 'widget']));
  },
  toggleModal: (open, options) => dispatch(toggleModal(open, options)),
  setModalOptions: options => dispatch(setModalOptions(options))
});

export default connect(mapStateToProps, mapDispatchToProps)(DatasetDetailPage);
