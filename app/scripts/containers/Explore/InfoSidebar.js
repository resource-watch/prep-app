import { connect } from 'react-redux';
import InfoSidebar from '../../components/Explore/InfoSidebar';

import { setDatasetActive } from '../../actions/datasets';
import {
  setDatasetSelected,
  deselectDataset,
  switchChange
} from '../../actions/exploremap';
import { updateURL } from '../../actions/links';
import { setInfoSidebarMetadata } from '../../actions/info-sidebar';

const mapStateToProps = state => ({
  dataset: state.datasets.filteredList.find(d => d.id === state.infoSidebar.metadata.datasetId) || {},
  details: state.datasets.details,
  metadata: state.infoSidebar.metadata,
  selectedDatasetId: state.exploremap.interactionData.datasetId
});
const mapDispatchToProps = dispatch => ({
  onClose: () => {
    dispatch(setInfoSidebarMetadata(false));
  },
  switchChange: (dataset) => {
    dispatch(switchChange(dataset.id));
    if (dataset.active) dispatch(setDatasetActive(dataset));
    dispatch(updateURL());
  },
  setDatasetSelected: datasetId => dispatch(setDatasetSelected(datasetId)),
  deselectDataset: () => dispatch(deselectDataset())
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoSidebar);
