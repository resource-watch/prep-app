import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import flatten from 'lodash/flatten';
import sortBy from 'lodash/sortBy';
import { calcZIndex } from 'components/map-vis/map-vis-helper';

const getAllDatasets = state => state.explorePage.datasets.items;

export const getNexLocaGeeDatasets = createSelector(getAllDatasets, (_datasets) => {
  const result = _datasets.filter((d) => d.vocabulary.find((v) => v.tags.includes('nexlocagee')));
  return result;
});

export const getNexLocaGeeDatasetsIds = createSelector(
  getNexLocaGeeDatasets,
  (_datasets) => _datasets.map((d) => d.id),
);

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
      activeDatasets.map(({ layer, opacity, visibility, zIndex }) => {
        const layerActive = layer.find((ly) => ly.isLayerActive === true) ||
          layer.find((ly) => ly.default === true);
        const layerIndex = calcZIndex(length, zIndex);
        const layersResult = layer.map(l => ({
          ...l,
          zIndex: layerIndex,
          opacity,
          visibility,
          active: layerActive.id === l.id,
          isActive: layerActive.id === l.id,
          isLayerActive: layerActive.id === l.id,
          isSelected: true, // NOTE: Forcing isSelected TRUE to don't render map when info panel changes.
          layers: layer
        }));
        return layersResult;
      })
    ), { isActive: true });
    return layers;
  }
);

export const getLayersGroups = createSelector(
  getAllDatasets,
  getActiveLayersForMap,
  (datasets, activeLayers) => {
    const activeDatasets = sortBy(filter(datasets, { isLayerActive: true }), l => l.zIndex);
    const groups = activeDatasets.map((d) => {
      const { id, opacity, zIndex, visibility } = activeLayers.find((l) => l.dataset === d.id);
      return {
        dataset: d.id,
        layers: d.layer.map(ly => ({
          ...ly,
          opacity,
          zIndex,
          visibility,
          active: id === ly.id,
          isActive: id === ly.id,
          isLayerActive: id === ly.id
        }))
      };
    });
    return groups;
  }
);

export default { getActiveLayers, getActiveLayersForMap, getLayersGroups };
