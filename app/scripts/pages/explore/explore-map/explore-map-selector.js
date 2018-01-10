import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';
import { calcZIndex } from 'components/map-vis/map-vis-helper';

const getAllDatasets = state => state.explorePage.datasets.items;

export const getActiveLayers = createSelector(
  getAllDatasets,
  (datasets) => {
    const activeDatasets = sortBy(filter(datasets, { isLayerActive: true }), l => l.zIndex);
    const { length } = activeDatasets;
    const layers = filter(flatten(
      activeDatasets.map(({ layer, opacity, zIndex }) => layer.map((l) => {
        const layerIndex = calcZIndex(length, zIndex);
        return { ...l, zIndex, layerIndex, opacity };
      }))
    ), { default: true });
    return layers;
  }
);

export default { getActiveLayers };
