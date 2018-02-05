import { initialState as datasetsInitialState } from './explore-datasets-list';
import { initialState as coreDatasetsInitialState } from './core-datasets-list';
import { initialState as datasetFiltersInitialState } from './explore-dataset-filters/explore-dataset-filters';
import { initialState as locationInitialState } from './explore-location-filter';
import { initialState as mapInitialState } from './explore-map';

const initialState = {
  tab: 'core_datasets',
  sidebar: {
    width: 430,
    open: true
  },
  map: mapInitialState,
  datasets: datasetsInitialState,
  datasetFilters: datasetFiltersInitialState,
  coreDatasets: { ...locationInitialState, ...coreDatasetsInitialState }
};

console.log({ ...locationInitialState, ...coreDatasetsInitialState });

export default initialState;
