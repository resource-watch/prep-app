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
      currentLayer = layers.find(l => ((mapMode !== 'difference') ?
        !l.attributes.layer_config.compareWith :
        l.attributes.layer_config.compareWith));
    }

    if (currentLayer && mapMode !== 'difference' && range1Selection) {
      const range1Date = `${range1Selection.value}`;
      activeLayers.push({
        url: `${config.apiUrlRW}/layer/${currentLayer.id}/tile/nexgddp/{z}/{x}/{y}?year=${range1Date}`,
        date: range1Date
      });
    }

    if (currentLayer && mapMode !== 'difference' && range2Selection) {
      const range2Date = `${range2Selection.value}`;
      activeLayers.push({
        url: `${config.apiUrlRW}/layer/${currentLayer.id}/tile/nexgddp/{z}/{x}/{y}?year=${range2Date}`,
        date: range2Date
      });
    }

    // Difference
    // year=1971&compareYear=2021&compareTo=74cf0091-1541-4cd9-b748-e2464173ba3e

    return activeLayers;
  }
);
