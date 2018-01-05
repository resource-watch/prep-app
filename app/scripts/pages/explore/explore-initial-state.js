import { initialState as datasetsInitialState } from './explore-datasets-list';
import { initialState as coreDatasetsInitialState } from './core-datasets-list';
import { initialState as locationInitialState } from './explore-location-filter';
import { initialState as mapInitialState } from './explore-map';

const initialState = {
  tab: 'core_datasets',
  map: mapInitialState,
  datasets: datasetsInitialState,
  coreDatasets: { ...locationInitialState, ...coreDatasetsInitialState },
  activeDatasets: []
};

export default initialState;
