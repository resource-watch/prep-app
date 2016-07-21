import { connect } from 'react-redux';
import DataMap from '../../components/maps/DataMap';

import { updateMapData } from '../../actions/datamap';
import { setSwitchStatus } from '../../actions/datasets';

const mapStateToProps = (state) => ({
  data: state.datasets.list,
  map: state.datamap
});
const mapDispatchToProps = (dispatch) => {
  return {
    onTileError: (id) => dispatch(setSwitchStatus(id, false)),
    setMapParams: (params, newParams) => dispatch(updateMapData(params, newParams))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(DataMap);
