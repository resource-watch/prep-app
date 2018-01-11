import { createSelector } from 'reselect';

// Temporal code
const mapIndicatorToUnit = {
  hdds: 'Degrees',
  cdds: 'Degrees',
  cum_pr: 'kg*m-2*s-1',
  dry: 'nº 5-day periods',
  tasmax: 'Kelvin',
  tasavg: 'Kelvin',
  xpr: 'days',
  xs: 'days',
  ffs: 'days',
  tasmin: 'Kelvin'
};

const state = state => state; // eslint-disable-line no-shadow
const mapMode = ({ nexgddptool }) => nexgddptool.mapMode;
const range1Selection = ({ nexgddptool }) => nexgddptool.range1.selection;
const range2Selection = ({ nexgddptool }) => nexgddptool.range2.selection;
const dataset = ({ datasets }) => {
  if (!datasets) return null;

  const keys = Object.keys(datasets.details);
  if (keys.length) {
    return datasets.details[keys[0]];
  }

  return null;
};
const layers = ({ nexgddptool }) => (nexgddptool.dataset ? nexgddptool.dataset.layer : []);

// eslint-disable-next-line import/prefer-default-export
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
        activeLayers.push({
          url: `${config.apiUrlRW}/layer/${currentLayer.id}/tile/nexgddp/{z}/{x}/{y}?year=${range1Date}&compareYear=${range2Date}`
        });
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
      && metadata.attributes.info
      && metadata.attributes.info.nexgddp
      && metadata.attributes.info.nexgddp.indicator_id;
    return indicatorId || null;
  }
);

export const getIndicatorUnit = createSelector(
  state,
  (state) => { // eslint-disable-line no-shadow
    const indicatorId = getIndicatorId(state);
    return indicatorId ? mapIndicatorToUnit[indicatorId] : null;
  }
);

export const getTempResolution = createSelector(
  dataset,
  (dataset) => { // eslint-disable-line no-shadow
    const metadata = dataset && dataset.metadata.length ? dataset.metadata[0] : null;
    const tempResolution = metadata
      && metadata.attributes.info
      && metadata.attributes.info.nexgddp
      && metadata.attributes.info.nexgddp.temp_resolution;
    return tempResolution || null;
  }
);
