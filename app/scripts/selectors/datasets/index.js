import { createSelector } from 'reselect';
import flattenDeep from 'lodash/flattenDeep';

import DATASETS_GROUPS from '../../general-constants/datasets-groups';

// Get datasets
const datasetsList = state => state.datasets.filteredList;
const tab = state => state.datasets.tab;

const filterDatasetsByTab = (_list, _tab) => {
  if (_tab === 'core_datasets') {
    const datasets = flattenDeep(DATASETS_GROUPS.map(t => t.subgroups.map(sg => sg.datasets))) || [];

    return _list.filter(l => datasets.includes(l.id));
  } return _list;
};

// Export the selector
export default createSelector(datasetsList, tab, filterDatasetsByTab);
