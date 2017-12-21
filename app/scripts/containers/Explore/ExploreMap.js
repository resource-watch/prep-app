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

  return sortByIndex(activeLayers);
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
          const layer = Object.assign({}, layers[l.id]);
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
  // data: getActiveLayers(state.datasets.filteredList, state.datasets.layers),
  enabledDatasets: getActiveDatasets(state.datasets.filteredList, state.datasets.layers),
  enabledLayers: getActiveLayers(state.datasets.filteredList, state.datasets.layers),
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
