import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';

const getAllDatasets = state => state.explorePage.datasets.items;

export const getActiveLayers = createSelector(
  getAllDatasets,
  (datasets) => {
    const activeDatasets = sortBy(filter(datasets, { isLayerActive: true }), l => l.zIndex);
    console.log(activeDatasets);
    const layers = flatten(activeDatasets.map(d => d.layer));
    return filter(layers, { default: true });
  }
);

export default { getActiveLayers };
