import { connect } from 'react-redux';
import ExploreSidebar from 'components/Explore/ExploreSidebar';

import { switchChange, deselectDataset } from 'actions/exploremap';
import { updateURL } from 'actions/links';
import { setTooltip } from 'actions/tooltip';
import { setInfoSidebarMetadata } from 'actions/info-sidebar';
import { setDatasetActive, getDatasetByIdOrSlug, changeTab } from 'actions/datasets';

// Selectors
import filterDatasetsByTab from 'selectors/datasets';

const mapStateToProps = state => ({
  listReceived: state.datasets.list.length > 0,
  data: filterDatasetsByTab(state),
  location: state.coreDatasetsFilter.location,
  infoSidebarMetadata: state.infoSidebar.metadata,
  selectedTab: state.datasets.tab,
  tooltip: state.tooltip,
  selectedDatasetId: state.exploremap.interactionData.datasetId
});
const mapDispatchToProps = dispatch => ({
  // TODO: get from backend dataset layer ids,
  // and just fetch the active one when swtich button is actived
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
  onInfoClick: (datasetSlug) => {
    dispatch(getDatasetByIdOrSlug(datasetSlug, ['metadata, vocabulary', 'widget']));
    dispatch(setInfoSidebarMetadata(true, datasetSlug));
  },
  onCloseInfo: () => {
    dispatch(setInfoSidebarMetadata(false));
  },
  onChangeTab: (tab) => {
    dispatch(changeTab(tab));
  },
  deselectDataset: () => dispatch(deselectDataset())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreSidebar);
