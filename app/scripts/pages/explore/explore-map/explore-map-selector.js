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
      activeDatasets.map(({ layer, opacity, visibility, isLayerActive, zIndex }) => {
        const layersResult = layer.map((l, i) => {
          const layerIndex = calcZIndex(length, zIndex);
          // NOTE: Forcing isSelected TRUE to don't render map when info panel changes.
          return { ...l, zIndex: layerIndex, opacity, isLayerActive, visibility, isSelected: true, layers: layer };
        });
        const checkActiveLayer = layersResult.find((l) => l.isLayerActive || l.default);
        if (!checkActiveLayer && layersResult.length) {
          layersResult[0] = {
            ...layersResult[0],
            isActive: true,
            isLayerActive: true,
            active: true
          };
        }
        return layersResult;
      })
    ), { isActive: true });
    return layers;
  }
);

export const getLayersGroups = createSelector(
  getAllDatasets,
  (datasets) => {
    const activeDatasets = sortBy(filter(datasets, { isLayerActive: true }), l => l.zIndex);
    const groups = activeDatasets.map((d) => {
      const layerActive = d.layer.find((ly) => ly.isLayerActive === true || ly.default === true) || d.layer[0];
      return {
        dataset: d.id,
        layers: d.layer.map(l => {
          const { opacity, visibility, zIndex, isSelected } = d;
          return { ...l, opacity, visibility, zIndex, isSelected, active: (layerActive.id === l.id) };
        })
      };
    });
    return groups;
  }
);

export default { getActiveLayers, getActiveLayersForMap, getLayersGroups };
