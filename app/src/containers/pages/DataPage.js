import { connect } from 'react-redux';
import DataPage from '../../components/pages/DataPage';

import { getDatasets } from '../../actions/datasets';
import { setModalMetadata } from '../../actions/modal';

const mapStateToProps = (state, location) => ({
  currentPage: location.route.path,
  data: state.datasets,
  metadataModal: state.modal.metadata
});

const mapDispatchToProps = (dispatch) => ({
  getDatasets: (defaultActiveLayers) => dispatch(getDatasets(defaultActiveLayers)),
  setModalMetadata: (status) =>
    dispatch(setModalMetadata(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataPage);
