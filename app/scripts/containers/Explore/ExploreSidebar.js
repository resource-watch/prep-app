import { connect } from 'react-redux';
import ExploreSidebar from '../../components/Explore/ExploreSidebar';

import { switchChange } from '../../actions/exploremap';
import { updateURL } from '../../actions/links';
import { getDatasetLayer, getDatasetById } from '../../actions/datasets';
import { setTooltip } from '../../actions/tooltip';
import { setModalMetadata } from '../../actions/modal';

const mapStateToProps = (state) => ({
  data: state.datasets.filteredList,
  filters: state.datasets.filters,
  tooltip: state.tooltip
});
const mapDispatchToProps = (dispatch) => ({
  switchChange: (dataset) => {
    dispatch(switchChange(dataset.id));
    if (dataset.active) dispatch(getDatasetLayer(dataset));
    dispatch(updateURL());
  },
  setTooltip: (tooltip) => {
    dispatch(setTooltip(tooltip));
  },
  onInfoClick: (datasetId) => {
    dispatch(getDatasetById(datasetId, ['metadata']));
    dispatch(setModalMetadata(true, datasetId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreSidebar);
