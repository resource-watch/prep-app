import { connect } from 'react-redux';
import ExploreMapLegend from '../../components/Explore/ExploreLegend';

import { setModalMetadata } from '../../actions/modal';
import { getDatasetMetadata } from '../../actions/datasets';

function isLayerReady(dataset, layers) {
  if (dataset.layers && dataset.layers.length) {
    const layerId = dataset.layers[0].layer_id;
    if (layers && layers[layerId]) {
      return true;
    }
  }
  return false;
}

function getActiveLayers(datasets, layers) {
  if (!datasets.length) {
    return [];
  }
  const activeLayers = [];
  datasets.forEach((dataset) => {
    if (dataset.active && isLayerReady(dataset, layers)) {
      const layer = layers[dataset.layers[0].layer_id];
      layer.title = dataset.name;
      activeLayers.push(layer);
    }
  });
  return activeLayers;
}

const mapStateToProps = (state) => ({
  data: getActiveLayers(state.datasets.list, state.datasets.layers)
});
const mapDispatchToProps = (dispatch) => ({
  onInfoClick: (datasetId) => {
    dispatch(getDatasetMetadata(datasetId));
    dispatch(setModalMetadata(true, datasetId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMapLegend);
