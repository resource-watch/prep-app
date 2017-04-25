import { connect } from 'react-redux';
import ExploreMapLegend from '../../components/Explore/ExploreLegend';

import { setModalMetadata } from '../../actions/modal';
import { getDatasetById, setDatasetActive } from '../../actions/datasets';
import {
  setLayersOrder,
  toggleLayerOpacity,
  setDatasetSelected,
  deselectDataset,
  switchChange
} from '../../actions/exploremap';
import { updateURL } from '../../actions/links';

function isLayerReady(dataset, layers) {
  if (dataset.layer && dataset.layer.length) {
    const layerId = dataset.layer[0].id;
    if (layers && layers[layerId]) {
      return true;
    }
  }
  return false;
}

function sortByIndex(items) {
  return items.sort((a, b) => a.index - b.index);
}

function getActiveLayers(datasets, layers) {
  if (!datasets.length) {
    return [];
  }
  const activeLayers = [];
  datasets.forEach((dataset) => {
    if (dataset.active && isLayerReady(dataset, layers)) {
      const layer = layers[dataset.layer[0].id];
      layer.title = dataset.name;
      layer.index = dataset.index;
      layer.opacity = dataset.opacity;
      activeLayers.push(layer);
    }
  });
  // activeLayers.sort(sortByIndex);
  return sortByIndex(activeLayers);
}

function getActiveDatasets(datasets, layers) {
  return datasets.filter(dataset => dataset.active && isLayerReady(dataset, layers));
}

const mapStateToProps = state => ({
  data: getActiveLayers(state.datasets.filteredList, state.datasets.layers),
  activeDatasets: getActiveDatasets(state.datasets.filteredList, state.datasets.layers),
  selectedDatasetId: state.exploremap.interactionData.datasetId
});
const mapDispatchToProps = dispatch => ({
  onInfoClick: (datasetId) => {
    dispatch(getDatasetById(datasetId, ['metadata']));
    dispatch(setModalMetadata(true, datasetId));
  },
  setLayersOrder: (layers) => {
    dispatch(setLayersOrder(layers));
    dispatch(updateURL());
  },
  switchChange: (dataset) => {
    dispatch(switchChange(dataset.id));
    if (dataset.active) dispatch(setDatasetActive(dataset));
    dispatch(updateURL());
  },
  toggleLayerOpacity: layerId => dispatch(toggleLayerOpacity(layerId)),
  setDatasetSelected: datasetId => dispatch(setDatasetSelected(datasetId)),
  deselectDataset: () => dispatch(deselectDataset())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMapLegend);
