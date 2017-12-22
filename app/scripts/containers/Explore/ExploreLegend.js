import { connect } from 'react-redux';
import ExploreMapLegend from 'components/Explore/ExploreLegend';

import { setInfoSidebarMetadata } from 'actions/info-sidebar';
import { toggleTooltip } from 'actions/tooltip';
import { getDatasetByIdOrSlug, setDatasetActive, setLayerGroupActiveLayer } from 'actions/datasets';
import {
  setLayersOrder,
  toggleLayerOpacity,
  setDatasetSelected,
  deselectDataset,
  switchChange
} from 'actions/exploremap';
import { updateURL } from 'actions/links';

// selectors
import { getActiveDatasetsSelector, getActiveLayersSelector } from 'selectors/explore-map';

const mapStateToProps = state => ({
  data: getActiveLayersSelector(state),
  activeDatasets: getActiveDatasetsSelector(state),
  selectedDatasetId: state.exploremap.interactionData.datasetId,
  infoMetadata: state.infoSidebar.metadata
});

const mapDispatchToProps = dispatch => ({
  toggleTooltip: (open, options) => dispatch(toggleTooltip(open, options)),
  onInfoClick: (datasetSlug) => {
    dispatch(getDatasetByIdOrSlug(datasetSlug, ['metadata', 'vocabulary', 'widget']));
    dispatch(setInfoSidebarMetadata(true, datasetSlug));
  },
  onCloseInfo: () => {
    dispatch(setInfoSidebarMetadata(false));
  },
  setLayersOrder: (layers) => {
    dispatch(setLayersOrder(layers));
    dispatch(updateURL());
  },
  setLayerGroupActiveLayer: (dataset, layer) => {
    dispatch(setLayerGroupActiveLayer(dataset, layer));
    dispatch(updateURL());
  },
  switchChange: (dataset, layers) => {
    dispatch(switchChange(dataset.id));
    if (dataset.active) dispatch(setDatasetActive(dataset));
    dispatch(setLayersOrder(layers));
    dispatch(updateURL());
  },
  toggleLayerOpacity: (layerId, opacity) => dispatch(toggleLayerOpacity(layerId, opacity)),
  setDatasetSelected: datasetId => dispatch(setDatasetSelected(datasetId)),
  deselectDataset: () => dispatch(deselectDataset())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreMapLegend);
