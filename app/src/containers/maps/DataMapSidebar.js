import { connect } from 'react-redux';
import DataMapSidebar from '../../components/maps/DataMapSidebar';

import { switchChange, updateURL } from '../../actions/datamap';
import { setModalShare } from '../../actions/modal';

const mapStateToProps = (state) => ({
  data: state.datasets.list
});
const mapDispatchToProps = (dispatch) => ({
  switchChange: (id) => {
    dispatch(switchChange(id));
    dispatch(updateURL());
  },
  setModalShare: (status) =>
    dispatch(setModalShare(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMapSidebar);
