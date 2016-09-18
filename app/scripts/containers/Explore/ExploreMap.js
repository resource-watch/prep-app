import { connect } from 'react-redux';
import ExploreMap from '../../components/Explore/ExploreMap';

import { updateMapParams, setSwitchStatus, getGeoDataInfo, setInteractionPosition, setInteractiveClose } from '../../actions/exploremap';
import { updateURL } from '../../actions/links';

const mapStateToProps = (state) => ({
  data: state.datasets.filteredList,
  interactionData: state.exploremap.interactionData,
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
  },
  setInteractionData: (datasetId, geo, position) => {
    dispatch(setInteractionPosition(position))
    dispatch(getGeoDataInfo(datasetId, geo))
  },
  setInteractiveClose: () => {dispatch(setInteractiveClose())}
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMap);
