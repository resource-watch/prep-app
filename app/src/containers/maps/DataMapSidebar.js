import { connect } from 'react-redux';
import DataMapSidebar from '../../components/maps/DataMapSidebar';

import { switchChange, updateURL } from '../../actions/datamap';

const mapStateToProps = (state) => ({
  data: state.datasets.list
});
const mapDispatchToProps = (dispatch) => ({
  switchChange: (id) => {
    dispatch(switchChange(id));
    dispatch(updateURL());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMapSidebar);
