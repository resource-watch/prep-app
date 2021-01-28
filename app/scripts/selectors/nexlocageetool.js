import 'whatwg-fetch';
import { createSelector } from 'reselect';

// Temporal code
const mapIndicatorToUnitSignal = {
  hdds: { from: 'Degrees', to: 'Degrees ºC', value: 1, type: 'factor' },
  cdds: { from: 'Degrees', to: 'Degrees ºC', value: 1, type: 'factor' },
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
const mapMode = ({ nexlocageetool }) => nexlocageetool.mapMode;
const scenario = ({ nexlocageetool }) => nexlocageetool.scenario;
const range1Selection = ({ nexlocageetool }) => nexlocageetool.range1.selection;
const range2Selection = ({ nexlocageetool }) => nexlocageetool.range2.selection;
const dataset = ({ nexlocageetool }) => nexlocageetool.dataset || null;
const additionalData = ({ datasetPage }) => datasetPage.additionalData || null;
const layers = ({ nexlocageetool }) => nexlocageetool.dataset ? nexlocageetool.dataset.layer : [];

// eslint-disable-next-line import/prefer-default-export
export const getLayers = createSelector(
  dataset,
  mapMode,
  scenario,
  range1Selection,
  range2Selection,
  additionalData,
  (dataset, mapMode, scenario, range1Selection, range2Selection, additionalData) => { // eslint-disable-line no-shadow
    if ((!range1Selection && !range2Selection) || !dataset || !additionalData || !dataset.layer.length) return [];
    const { layer } = dataset;
    const activeLayers = [];

    if (mapMode === 'difference') {
      const range1Date = `${range1Selection.value}`;
      const { layer: additionalLayers } = additionalData.change[scenario.selection.value];
      const currentLayer = additionalLayers.find(({ layerConfig }) => layerConfig.order === range1Selection.value);

      activeLayers.push({
        url: `${config.apiUrlRW}/layer/${currentLayer.id}/tile/gee/{z}/{x}/{y}`,
        date: range1Date,
      });

      return activeLayers;
    }

    if (range1Selection) {
      const currentLayer1 = layer.find(({ layerConfig }) => layerConfig.order === range1Selection.value);
      const range1Date = `${range1Selection.value}`;
      activeLayers.push({
        url: `${config.apiUrlRW}/layer/${currentLayer1.id}/tile/gee/{z}/{x}/{y}`,
        date: range1Date
      });
    }

    if (range2Selection) {
      const currentLayer2 = layer.find(({ layerConfig }) => layerConfig.order === range2Selection.value);
      const range2Date = `${range2Selection.value}`;
      activeLayers.push({
        url: `${config.apiUrlRW}/layer/${currentLayer2.id}/tile/gee/{z}/{x}/{y}`,
        date: range2Date
      });
    }

    return activeLayers;
  }
);

export const getRawLayers = createSelector(
  layers,
  (layers) => { // eslint-disable-line no-shadow
    if (!layers.length) return [];
    return layers.slice(0, 1);
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
  ({ datasetPage : { data: { layer } } }) => {
    const { legendConfig: { unit } } = layer[0];
    return {
      from: '',
      to: unit,
      value: 1,
      type: 'factor',
    };
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
