import { createSelector } from 'reselect';


const datasetId = ({ nexgddptool }) => nexgddptool.dataset;
const mapMode = ({ nexgddptool }) => nexgddptool.mapMode;
const range1Selection = ({ nexgddptool }) => nexgddptool.range1.selection;
const range2Selection = ({ nexgddptool }) => nexgddptool.range2.selection;

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

    const layers = datasetDetails[datasetId].layer || [];

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
