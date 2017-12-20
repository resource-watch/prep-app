import { connect } from 'react-redux';
import ExploreMap from '../../components/Explore/ExploreMap';

import {
  updateMapParams,
  setSwitchStatus,
  getGeoDataInfo,
  setInteractionPosition,
  setInteractionVisibility
} from '../../actions/exploremap';
import { updateURL } from '../../actions/links';

const mapStateToProps = state => ({
  data: state.datasets.filteredList,
  interactionData: state.exploremap.interactionData,
  layers: state.datasets.layers,
  map: state.exploremap
});

const mapDispatchToProps = dispatch => ({
  onTileError: (id) => {
    dispatch(setSwitchStatus(id, false));
    dispatch(updateURL());
  },
  setMapParams: (params) => {
    dispatch(updateMapParams(params));
    // dispatch(updateURL());
  },
  setInteractionData: (datasetId, geo) => {
    dispatch(getGeoDataInfo(datasetId, geo));
  },
  setInteractionPosition: (position) => {
    dispatch(setInteractionPosition(position));
  },
  setInteractionVisibility: (visible) => {
    dispatch(setInteractionVisibility(visible));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMap);
