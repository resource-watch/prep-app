import { connect } from 'react-redux';
import Explore from '../../components/Explore';
import { getDatasets, resetDatasetList } from '../../actions/datasets';
import { setModalMetadata } from '../../actions/modal';

const mapStateToProps = (state, { location, params }) => ({
  data: state.datasets,
  location,
  params,
  metadataModal: state.modal.metadata
});

const mapDispatchToProps = dispatch => ({
  getDatasets: defaultActiveLayers => dispatch(getDatasets(defaultActiveLayers)),
  setModalMetadata: status => dispatch(setModalMetadata(status)),
  resetExplore: () => {
    dispatch(resetDatasetList());
    dispatch(setModalMetadata(false));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
