import { createSelector } from 'reselect';

import selectElementsFromTree from 'helpers/dropdown-tree';

const data = state => state.exploreDatasetFilter.data;
const filters = state => state.exploreDatasetFilter.filters;

const getFilterStatus = (_data, _filters) => {
  if (!Object.keys(_data).length) return {};
  if (!Object.keys(_filters).length) return _data;

  const data = _data;

  Object.keys(_filters).map((filterKey) => {
    const filterValues = _filters[filterKey];
    const dataTree = _data[filterKey] || [];

    dataTree.forEach(child => selectElementsFromTree(child, filterValues));
  });

  return data;
};

export default createSelector(data, filters, getFilterStatus);
