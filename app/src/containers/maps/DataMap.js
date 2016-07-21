import { connect } from 'react-redux';
import DataMap from '../../components/maps/DataMap';

import { updateMapParams, updateURL } from '../../actions/datamap';
import { setSwitchStatus } from '../../actions/datasets';

const mapStateToProps = (state) => ({
  data: state.datasets.list,
  map: state.datamap
});
const mapDispatchToProps = (dispatch) => ({
  onTileError: (id) => dispatch(setSwitchStatus(id, false)),
  initMapParams: (params) => dispatch(updateMapParams(params)),
  setMapParams: (params) => {
    dispatch(updateMapParams(params));
    dispatch(updateURL());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataMap);
