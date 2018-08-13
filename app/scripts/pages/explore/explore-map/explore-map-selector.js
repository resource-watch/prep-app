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
      activeDatasets.map(({ layer, opacity, visibility, zIndex, isSelected }) => layer.map((l) => {
        const layerIndex = calcZIndex(length, zIndex);
        return { ...l, zIndex, layerIndex, opacity, visibility, isSelected, layers: layer };
      }))
    ), { isActive: true });
    return layers;
  }
);

export const getActiveLayersForMap = createSelector(
  getAllDatasets,
  (datasets) => {
    const activeDatasets = sortBy(filter(datasets, { isLayerActive: true }), l => l.zIndex);
    const { length } = activeDatasets;
    const layers = filter(flatten(
      activeDatasets.map(({ layer, opacity, visibility, zIndex }) => layer.map((l) => {
        const layerIndex = calcZIndex(length, zIndex);
        // NOTE: Forcing isSelected TRUE to don't render map when info panel changes.
        return { ...l, zIndex, layerIndex, opacity, visibility, isSelected: true, layers: layer };
      }))
    ), { isActive: true });
    return layers;
  }
);

export const getLayersGroups = createSelector(
  getAllDatasets,
  (datasets) => {
    const activeDatasets = sortBy(filter(datasets, { isLayerActive: true }), l => l.zIndex);
    const groups = activeDatasets.map((d) => {
      const layerActive = d.layer.find((ly) => ly.isLayerActive === true ) || d.layer[0];
      console.log(layerActive)
      return {
        dataset: d.id,
        layers: d.layer.map((l, i) => {
          const { opacity, visibility, zIndex } = d;
          return { ...l, opacity, visibility, zIndex, active: (layerActive.id === l.id) };
        })
      };
    });
    return groups;
  }
);

export default { getActiveLayers, getActiveLayersForMap, getLayersGroups };
