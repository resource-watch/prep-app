import { connect } from 'react-redux';
import ContainerPage from '../../components/pages/ContainerPage';

import { setModalShare } from '../../actions/modal';

const mapStateToProps = (state) => ({
  modalOpen: state.modal.share
});

const mapDispatchToProps = (dispatch) => ({
  setModalShare: (status) =>
    dispatch(setModalShare(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContainerPage);
