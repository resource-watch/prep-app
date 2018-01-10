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
const datasetId = ({ nexgddptool }) => nexgddptool.dataset;
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

const datasetDetails = ({ datasets }) => datasets.details;

// eslint-disable-next-line import/prefer-default-export
export const getLayers = createSelector(
  datasetDetails,
  datasetId,
  mapMode,
  range1Selection,
  range2Selection,
  (datasetDetails, datasetId, mapMode, range1Selection, range2Selection) => { // eslint-disable-line no-shadow
    if (!range1Selection && !range2Selection) return [];

    let currentLayer = {};
    const activeLayers = [];

    const layers = (datasetDetails[datasetId] || {}).layer || [];

    if (mapMode !== 'difference') {
      currentLayer = layers.find(l => !l.attributes.layer_config.compare_with);

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
      currentLayer = layers.find(l => l.attributes.layer_config.compare_with);

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
  dataset,
  datasetId,
  mapMode,
  (dataset, datasetId, mapMode) => { // eslint-disable-line no-shadow
    const layers = dataset.layer || [];

    if (mapMode !== 'difference') {
      return [layers.find(l => !l.attributes.layer_config.compare_with)];
    }

    return [layers.find(l => l.attributes.layer_config.compare_with)];
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
