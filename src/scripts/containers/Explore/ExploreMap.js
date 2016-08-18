import { connect } from 'react-redux';
import ExploreMap from '../../components/Explore/ExploreMap';

import {
  updateMapParams,
  updateURL,
  setSwitchStatus
} from '../../actions/exploremap';

const mapStateToProps = (state) => ({
  data: state.datasets.list,
  layers: state.datasets.layers,
  map: state.exploremap
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

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMap);
