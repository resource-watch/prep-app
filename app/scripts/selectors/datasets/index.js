import { createSelector } from 'reselect';
import flattenDeep from 'lodash/flattenDeep';

import DATASETS_GROUPS from '../../general-constants/datasets-groups';

import getDatasetsFiltered from 'helpers/dataset-filter';

// Get datasets
const datasetsList = state => state.datasets.filteredList;
const tab = state => state.datasets.tab;
const datasetFilters = state => state.exploreDatasetFilter.filters;

const filterDatasetsByTab = (_list, _tab, _datasetFilters) => {
  if (!(_list || []).length) return [];

  if (_tab === 'core_datasets') {
    const datasets = flattenDeep(DATASETS_GROUPS.map(t => t.subgroups.map(sg => sg.datasets))) || [];

    return _list.filter(l => datasets.includes(l.id));
  }

  if (!Object.keys(_datasetFilters).length) return _list;

  return getDatasetsFiltered(_list, _datasetFilters);
};

// Export the selector
export default createSelector(datasetsList, tab, datasetFilters, filterDatasetsByTab);
