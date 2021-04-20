import 'whatwg-fetch';
import { createSelector } from 'reselect';

const state = state => state; // eslint-disable-line no-shadow
const mapMode = ({ nexlocageetool }) => nexlocageetool.mapMode;
const scenario = ({ nexlocageetool }) => nexlocageetool.scenario;
const range1Selection = ({ nexlocageetool }) => nexlocageetool.range1.selection;
const range2Selection = ({ nexlocageetool }) => nexlocageetool.range2.selection;
const dataset = ({ nexlocageetool }) => nexlocageetool.dataset || null;
const additionalData = ({ datasetPage }) => datasetPage.additionalData || null;

export const getActiveRawLayers = createSelector(
  dataset,
  range1Selection,
  range2Selection,
  mapMode,
  scenario,
  additionalData,
  (dataset, range1Selection, range2Selection, mapMode, scenario, additionalData) => { // eslint-disable-line no-shadow
    if ((!range1Selection && !range2Selection) || !dataset || !additionalData || !dataset.layer.length) return [];
    const { layer } = dataset;
    const activeLayers = [];

    if (mapMode === 'difference') {
      const { layer: additionalLayers } = additionalData.change[scenario.selection.value];
      const currentLayer = additionalLayers.find(({ layerConfig }) => layerConfig.order === range1Selection.value);

      activeLayers.push(currentLayer);

      return activeLayers;
    }

    if (range1Selection) {
      const currentLayer1 = layer.find(({ layerConfig }) => layerConfig.order === range1Selection.value);
      activeLayers.push(currentLayer1);
    }

    if (range2Selection) {
      const currentLayer2 = layer.find(({ layerConfig }) => layerConfig.order === range2Selection.value);
      activeLayers.push(currentLayer2);
    }

    return activeLayers;
  }
);

export const getActiveLayers = createSelector(
  getActiveRawLayers,
  range1Selection,
  range2Selection,
  (activeRawLayers, range1Selection, range2Selection) => { // eslint-disable-line no-shadow
    let activeLayers = activeRawLayers && activeRawLayers.length ? activeRawLayers.filter((layer) => !!layer) : [];

    if ((!range1Selection && !range2Selection) || !activeLayers.length) return [];

    const range1Date = range1Selection ? `${range1Selection.value}` : null;
    const range2Date = range2Selection ? `${range2Selection.value}` : null;


    activeLayers = activeRawLayers.map((layer) => ({
      url: `${config.apiUrlRW}/layer/${layer.id}/tile/gee/{z}/{x}/{y}`,
      date: range2Selection ? range2Date : range1Date,
    }));

    return activeLayers;
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
    if (!layer) return {};
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
