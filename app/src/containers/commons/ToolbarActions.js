import { connect } from 'react-redux';
import ToolbarActions from '../../components/commons/ToolbarActions';

import { setModalShare } from '../../actions/modal';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch) => ({
  setModalShare: (status) =>
    dispatch(setModalShare(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarActions);
