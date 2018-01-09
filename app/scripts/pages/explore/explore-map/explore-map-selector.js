import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';

const getAllDatasets = state => state.explorePage.datasets.items;

export const getActiveLayers = createSelector(
  getAllDatasets,
  (datasets) => {
    const activeDatasets = sortBy(filter(datasets, { isLayerActive: true }), l => l.zIndex);
    const layers = flatten(activeDatasets.map(({ layer, opacity, zIndex }) => layer.map(l => ({ ...l, zIndex, opacity }))));
    return filter(layers, { default: true });
  }
);

export default { getActiveLayers };
