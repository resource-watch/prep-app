
import { createSelector } from 'reselect';

// Selectors
import filterDatasetsByTab from 'selectors/datasets';

// helpers
import { isLayerReady, sortLayersByIndex } from 'helpers/explore-map';

const getFilteredDatasets = state => filterDatasetsByTab(state);
const activeDatasets = state => state.datasets.activeDatasets;
const getLayers = state => state.datasets.layers;

const getActiveDatasets = (filteredDatasets, activeDatasetsIds, layers) => {
  if (!(filteredDatasets || []).length || !(activeDatasetsIds || []).length) return [];

  return filteredDatasets.filter((dataset) => {
    let layersReady = false;

    (dataset.layer || []).forEach((layer) => {
      if (isLayerReady(layer, layers)) layersReady = true;
    });

    return activeDatasetsIds.includes(dataset.id) && layersReady;
  });
};

const getActiveLayers = (filteredDatasets, activeDatasetsIds, layers) => {
  if (!(filteredDatasets || []).length) return [];

  const activeLayers = [];

  filteredDatasets.filter(dataset => activeDatasetsIds.includes(dataset.id))
    .forEach((dataset) => {
      (dataset.layer || []).forEach((_layer) => {
        if (isLayerReady(_layer, layers)) {
          const { name, index, opacity } = dataset;
          const layer = {
            ...layers[_layer.id],
            title: name,
            index,
            opacity
          };
          activeLayers.push(layer);
        }
      });
    });

  return sortLayersByIndex(activeLayers);
};

export const getActiveLayersSelector = createSelector(getFilteredDatasets, activeDatasets, getLayers, getActiveLayers);
export const getActiveDatasetsSelector = createSelector(getFilteredDatasets, activeDatasets, getLayers, getActiveDatasets);
