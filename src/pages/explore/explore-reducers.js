import { reducers as filterLocationReducers } from './explore-location-filter';
import { reducers as datasetsListReducers } from './explore-datasets-list';
import { reducers as coreDatasetsListReducers } from './core-datasets-list';
import { reducers as datasetFiltersReducers } from './explore-dataset-filters/explore-dataset-filters';
import { reducers as mapReducers } from './explore-map';
import { reducers as popupReducers } from './explore-map/explore-map-popup';
import * as actions from './explore-actions';

const exploreReducers = {
  [actions.setTab]: (state, { payload }) => ({ ...state, tab: payload }),
  [actions.setBasemap]: mapReducers.setBasemap,
  [actions.setLabels]: mapReducers.setLabels,
  [actions.setBoundaries]: mapReducers.setBoundaries,
  [actions.setWater]: mapReducers.setWater,
  [actions.setMapParams]: mapReducers.setMapParams,
  [actions.setBBox]: mapReducers.setBBox,
  [actions.setInteractions]: popupReducers.setInteractions,
  [actions.setLocation]: filterLocationReducers.setLocation,
  [actions.fetchLocations]: filterLocationReducers.fetchLocations,
  [actions.receiveLocations]: filterLocationReducers.receiveLocations,
  [actions.failureLocations]: filterLocationReducers.failureLocations,
  [actions.fetchDatasets]: datasetsListReducers.fetchDatasets,
  [actions.receiveDatasets]: datasetsListReducers.receiveDatasets,
  [actions.failureDatasets]: datasetsListReducers.failureDatasets,
  [actions.fetchCoreDatasets]: coreDatasetsListReducers.fetchCoreDatasets,
  [actions.receiveCoreDatasets]: coreDatasetsListReducers.receiveCoreDatasets,
  [actions.failureCoreDatasets]: coreDatasetsListReducers.failureCoreDatasets,
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
  [actions.setMultiActiveLayer]: datasetsListReducers.setMultiActiveLayer,
  [actions.clearFilters]: datasetFiltersReducers.clearFilters,
  [actions.onClearFilters]: datasetFiltersReducers.onClearFilters,
  [actions.updateDataFilters]: datasetFiltersReducers.updateDataFilters,
  [actions.setSidebar]: (state, { payload }) => ({ ...state, sidebar: payload })
};

export default exploreReducers;
