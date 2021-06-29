import { connect } from 'react-redux';
import ExploreMap from 'components/Explore/ExploreMap';

import {
  updateMapParams,
  setSwitchStatus,
  getGeoDataInfo,
  setInteractionPosition,
  setInteractionVisibility
} from 'actions/exploremap';
import { updateURL } from 'actions/links';

// Selectors
import filterDatasetsByTab from 'selectors/datasets';
import { getActiveDatasetsSelector, getActiveLayersSelector } from 'selectors/explore-map';

const mapStateToProps = state => ({
  enabledDatasets: getActiveDatasetsSelector(state),
  enabledLayers: getActiveLayersSelector(state),
  data: filterDatasetsByTab(state),
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
    dispatch(updateURL());
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
