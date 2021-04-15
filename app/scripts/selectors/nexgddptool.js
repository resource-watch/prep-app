import { createSelector } from 'reselect';

// Temporal code
const mapIndicatorToUnitSignal = {
  hdds: { from: 'Degrees', to: 'Degrees', value: 1, type: 'factor' },
  cdds: { from: 'Degrees', to: 'Degrees', value: 1, type: 'factor' },
  cum_pr: { from: 'Kg*m-2*s-1', to: 'mm', value: 86400, type: 'factor' },
  dry: { from: 'Nº 5-day periods', to: 'Nº 5-day periods', value: 1, type: 'factor' },
  tasmax: { from: 'Kelvin', to: 'ºC', value: 273.23, type: 'minus' },
  tasavg: { from: 'Kelvin', to: 'ºC', value: 273.23, type: 'minus' },
  xpr: { from: 'Days', to: 'Days', value: 1, type: 'factor' },
  xs: { from: 'Days', to: 'Days', value: 1, type: 'factor' },
  ffs: { from: 'Days', to: 'Days', value: 1, type: 'factor' },
  tasmin: { from: 'Kelvin', to: 'ºC', value: 273.23, type: 'minus' }
};

const state = state => state; // eslint-disable-line no-shadow
const mapMode = ({ nexgddptool }) => nexgddptool.mapMode;
const range1Selection = ({ nexgddptool }) => nexgddptool.range1.selection;
const range2Selection = ({ nexgddptool }) => nexgddptool.range2.selection;
const dataset = ({ nexgddptool }) => nexgddptool.dataset || null;
const layers = ({ nexgddptool }) => (nexgddptool.indicatorDataset ? nexgddptool.indicatorDataset.layer : []);

export const getLayers = createSelector(
  layers,
  mapMode,
  range1Selection,
  range2Selection,
  (layers, mapMode, range1Selection, range2Selection) => { // eslint-disable-line no-shadow
    if ((!range1Selection && !range2Selection) || !layers.length) return [];

    let currentLayer = {};
    const activeLayers = [];

    if (mapMode !== 'difference') {
      currentLayer = layers.find(l => !l.attributes.layerConfig.compareWith);

      if (currentLayer && range1Selection) {
        const range1Date = `${range1Selection.value}`;
        activeLayers.push({
          url: `${config.apiUrlRW}/layer/${currentLayer.id}/tile/nexgddp/{z}/{x}/{y}?year=${range1Date}`,
          date: range1Date
        });
      }

      if (currentLayer && range2Selection) {
        const range2Date = `${range2Selection.value}`;
        activeLayers.push({
          url: `${config.apiUrlRW}/layer/${currentLayer.id}/tile/nexgddp/{z}/{x}/{y}?year=${range2Date}`,
          date: range2Date
        });
      }
    } else {
      currentLayer = layers.find(l => l.attributes.layerConfig.compareWith);

      if (currentLayer && range1Selection && range2Selection) {
        const range1Date = `${range1Selection.value}`;
        const range2Date = `${range2Selection.value}`;
        activeLayers.push({ url: `${config.apiUrlRW}/layer/${currentLayer.id}/tile/nexgddp/{z}/{x}/{y}?year=${range1Date}&compareYear=${range2Date}` });
      }
    }

    return activeLayers;
  }
);

export const getRawLayers = createSelector(
  layers,
  mapMode,
  (layers, mapMode) => { // eslint-disable-line no-shadow
    if (!layers.length) return [];

    if (mapMode !== 'difference') {
      return [layers.find(l => !l.attributes.layerConfig.compareWith)];
    }

    return [layers.find(l => l.attributes.layerConfig.compareWith)];
  }
);

export const getIndicatorId = createSelector(
  dataset,
  (dataset) => { // eslint-disable-line no-shadow
    const metadata = dataset && dataset.metadata.length ? dataset.metadata[0] : null;
    const indicatorId = metadata
      && metadata.info
      && metadata.info.nexgddp
      && metadata.info.nexgddp.indicator_id;
    return indicatorId || null;
  }
);

export const getIndicatorUnitSignal = createSelector(
  state,
  (state) => { // eslint-disable-line no-shadow
    const indicatorId = getIndicatorId(state);
    return indicatorId ? mapIndicatorToUnitSignal[indicatorId] : null;
  }
);

// NOTE: only use this selector if the tempResolution attribute
// has not been set yet in the reducer
export const getTempResolution = createSelector(
  dataset,
  (dataset) => { // eslint-disable-line no-shadow
    const metadata = dataset && dataset.metadata.length ? dataset.metadata[0] : null;
    const tempResolution = metadata
      && metadata.info
      && metadata.info.nexgddp
      && metadata.info.nexgddp.temp_resolution;
    return tempResolution || null;
  }
);
