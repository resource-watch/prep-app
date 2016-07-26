import { connect } from 'react-redux';
import DataMap from '../../components/maps/DataMap';

import {
  updateMapParams,
  updateURL,
  setSwitchStatus
} from '../../actions/datamap';

const mapStateToProps = (state) => ({
  data: state.datasets.list,
  map: state.datamap
});
const mapDispatchToProps = (dispatch) => ({
  onTileError: (id) => {
    dispatch(setSwitchStatus(id, false));
    dispatch(updateURL());
  },
  setMapParams: (params) => {
    dispatch(updateMapParams(params));
    dispatch(updateURL());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMap);
