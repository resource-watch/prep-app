import { reducers as filterLocationReducers } from './explore-location-filter';
import { reducers as datasetsListReducers } from './explore-datasets-list';
import { reducers as datasetFiltersReducers } from './explore-dataset-filters/explore-dataset-filters';
import { reducers as mapReducers } from './explore-map';
import * as actions from './explore-actions';

export default {
  [actions.setTab]: (state, { payload }) => ({ ...state, tab: payload }),
  [actions.setBasemap]: mapReducers.setBasemap,
  [actions.setLabels]: mapReducers.setLabels,
  [actions.setBoundaries]: mapReducers.setBoundaries,
  [actions.setMapParams]: mapReducers.setMapParams,
  [actions.setLocation]: filterLocationReducers.setLocation,
  [actions.fetchDatasets]: datasetsListReducers.fetchDatasets,
  [actions.receiveDatasets]: datasetsListReducers.receiveDatasets,
  [actions.failureDatasets]: datasetsListReducers.failureDatasets,
  [actions.filterQuery]: datasetsListReducers.filterQuery,
  [actions.toggleDataset]: datasetsListReducers.toggleDataset,
  [actions.toggleInfo]: datasetsListReducers.toggleInfo,
  [actions.toggleVisibility]: datasetsListReducers.toggleVisibility,
  [actions.setActiveDatasets]: datasetsListReducers.setActiveDatasets,
  [actions.updateActiveDatasets]: datasetsListReducers.updateActiveDatasets,
  [actions.updateZIndex]: datasetsListReducers.updateZIndex,
  [actions.updateOpacity]: datasetsListReducers.updateOpacity,
  [actions.setDataFilters]: datasetFiltersReducers.setDataFilters,
  [actions.setDatasetFilter]: datasetFiltersReducers.setDatasetFilter,
  [actions.setGraphFilter]: datasetFiltersReducers.setGraphFilter,
  [actions.setNexGDDPActiveLayer]: datasetsListReducers.setNexGDDPActiveLayer
};
