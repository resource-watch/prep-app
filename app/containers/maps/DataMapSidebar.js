import { connect } from 'react-redux';
import DataMapSidebar from '../../components/maps/DataMapSidebar';

import { switchChange } from '../../actions/datasets';

const mapStateToProps = (state) => ({
  data: state.datasets.list
});
const mapDispatchToProps = (dispatch) => ({
  switchChange: (id) => dispatch(switchChange(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMapSidebar);
