import { connect } from 'react-redux';
import InfoSidebar from '../../components/Explore/InfoSidebar';

import { getDatasetById, setDatasetActive, setLayerGroupActiveLayer } from '../../actions/datasets';
import {
  // setLayersOrder,
  // toggleLayerOpacity,
  setDatasetSelected,
  deselectDataset,
  switchChange
} from '../../actions/exploremap';
import { updateURL } from '../../actions/links';
import { setInfoSideabrMetadata } from '../../actions/info-sidebar';

// function isLayerReady(layer, layers) {
//   return layers && !!layers[layer.id];
// }
//
// function sortByIndex(items) {
//   return items.sort((a, b) => a.index - b.index);
// }

// function getActiveLayers(datasets, layers) {
//   if (!datasets.length) {
//     return [];
//   }
//   const activeLayers = [];
//
//   datasets.forEach((dataset) => {
//     if (dataset.active && dataset.layer && dataset.layer.length) {
//       dataset.layer.forEach((l) => {
//         if (isLayerReady(l, layers)) {
//           const layer = layers[l.id];
//           layer.title = dataset.name;
//           layer.index = dataset.index;
//           layer.opacity = dataset.opacity;
//           activeLayers.push(layer);
//         }
//       });
//     }
//   });
//   // activeLayers.sort(sortByIndex);
//   return sortByIndex(activeLayers);
// }

// function getActiveDatasets(datasets, layers) {
//   return datasets.filter((dataset) => {
//     let active = false;
//     dataset.layer.forEach((l) => {
//       if (isLayerReady(l, layers)) active = true;
//     });
//     return dataset.active && active;
//   });
// }

const mapStateToProps = state => ({
  // activeDatasets: getActiveDatasets(state.datasets.filteredList, state.datasets.layers),
  dataset: state.datasets.filteredList.find(d => d.id === state.infoSidebar.metadata.datasetId) || {},
  details: state.datasets.details,
  metadata: state.infoSidebar.metadata,
  selectedDatasetId: state.exploremap.interactionData.datasetId
});
const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(setInfoSideabrMetadata(false));
  },
  // setLayerGroupActiveLayer: (dataset, layer) => {
  //   dispatch(setLayerGroupActiveLayer(dataset, layer));
  //   dispatch(updateURL());
  // },
  switchChange: (dataset) => {
    dispatch(switchChange(dataset.id));
    if (dataset.active) dispatch(setDatasetActive(dataset));
    dispatch(updateURL());
  },
  setDatasetSelected: datasetId => dispatch(setDatasetSelected(datasetId)),
  deselectDataset: () => dispatch(deselectDataset())
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoSidebar);
