import { connect } from 'react-redux';
import ExploreSidebar from '../../components/Explore/ExploreSidebar';

import { switchChange, deselectDataset } from '../../actions/exploremap';
import { updateURL } from '../../actions/links';
import { getDatasetById } from '../../actions/datasets';
import { setTooltip } from '../../actions/tooltip';
import { setModalMetadata } from '../../actions/modal';
import { setDatasetActive } from '../../actions/datasets';

const mapStateToProps = (state) => ({
  listReceived: state.datasets.list.length > 0,
  data: state.datasets.filteredList,
  filters: state.datasets.filters,
  tooltip: state.tooltip,
  selectedDatasetId: state.exploremap.interactionData.datasetId
});
const mapDispatchToProps = (dispatch) => ({
  // TODO: get from backend dataset layer ids, and just fetch the active one when swtich button is actived
  // switchChange: (dataset) => {
  //   dispatch(switchChange(dataset.id));
  //   if (dataset.active) dispatch(getDatasetLayer(dataset));
  //   dispatch(updateURL());
  // },
  switchChange: (dataset) => {
    dispatch(switchChange(dataset.id));
    if (dataset.active) dispatch(setDatasetActive(dataset));
    dispatch(updateURL());
  },
  setTooltip: (tooltip) => {
    dispatch(setTooltip(tooltip));
  },
  onInfoClick: (datasetId) => {
    dispatch(getDatasetById(datasetId, ['metadata']));
    dispatch(setModalMetadata(true, datasetId));
  },
  deselectDataset: () => dispatch(deselectDataset())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreSidebar);
