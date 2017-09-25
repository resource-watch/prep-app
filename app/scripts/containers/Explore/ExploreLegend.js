import { connect } from 'react-redux';
import ExploreMapLegend from '../../components/Explore/ExploreLegend';

import { setModalMetadata } from '../../actions/modal';
import { toggleTooltip } from '../../actions/tooltip';
import { getDatasetById, setDatasetActive, setLayerGroupActiveLayer } from '../../actions/datasets';
import {
  setLayersOrder,
  toggleLayerOpacity,
  setDatasetSelected,
  deselectDataset,
  switchChange
} from '../../actions/exploremap';
import { updateURL } from '../../actions/links';

function isLayerReady(layer, layers) {
  return layers && !!layers[layer.id];
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
    if (dataset.active && dataset.layer && dataset.layer.length) {
      dataset.layer.forEach((l) => {
        if (isLayerReady(l, layers)) {
          const layer = layers[l.id];
          layer.title = dataset.name;
          layer.index = dataset.index;
          layer.opacity = dataset.opacity;
          activeLayers.push(layer);
        }
      });
    }
  });
  // activeLayers.sort(sortByIndex);
  return sortByIndex(activeLayers);
}

function getActiveDatasets(datasets, layers) {
  return datasets.filter((dataset) => {
    let active = false;
    dataset.layer.forEach((l) => {
      if (isLayerReady(l, layers)) active = true;
    });
    return dataset.active && active;
  });
}

const mapStateToProps = state => ({
  data: getActiveLayers(state.datasets.filteredList, state.datasets.layers),
  activeDatasets: getActiveDatasets(state.datasets.filteredList, state.datasets.layers),
  selectedDatasetId: state.exploremap.interactionData.datasetId
});
const mapDispatchToProps = dispatch => ({
  toggleTooltip: (open, options) => dispatch(toggleTooltip(open, options)),
  onInfoClick: (datasetId) => {
    dispatch(getDatasetById(datasetId, ['metadata']));
    dispatch(setModalMetadata(true, datasetId));
  },
  setLayersOrder: (layers) => {
    dispatch(setLayersOrder(layers));
    dispatch(updateURL());
  },
  setLayerGroupActiveLayer: (layer) => {
    dispatch(setLayerGroupActiveLayer(layer));
    dispatch(updateURL());
  },
  switchChange: (dataset) => {
    dispatch(switchChange(dataset.id));
    if (dataset.active) dispatch(setDatasetActive(dataset));
    dispatch(updateURL());
  },
  toggleLayerOpacity: (layerId, opacity) => dispatch(toggleLayerOpacity(layerId, opacity)),
  setDatasetSelected: datasetId => dispatch(setDatasetSelected(datasetId)),
  deselectDataset: () => dispatch(deselectDataset())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMapLegend);
