import { connect } from 'react-redux';
import ExploreMap from '../../components/Explore/ExploreMap';

import { updateMapParams, setSwitchStatus } from '../../actions/exploremap';
import { updateURL } from '../../actions/links';

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
