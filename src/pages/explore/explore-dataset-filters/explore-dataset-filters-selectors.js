import { createSelector } from 'reselect';

import selectElementsFromTree from 'helpers/dropdown-tree';

const data = state => state.explorePage.datasetFilters.data;
const filters = state => state.explorePage.datasetFilters.filters;
const originalData = state => state.explorePage.datasetFilters.originalData;

const getFilterStatus = (_data, _filters, _originalData) => {
  if (!Object.keys(_data).length) return {};
  if (!Object.keys(_filters).length) return { ..._originalData };

  const newData = _data;

  Object.keys(_filters).map((filterKey) => {
    const filterValues = _filters[filterKey];
    const dataTree = newData[filterKey] || [];

    dataTree.forEach(child => selectElementsFromTree(child, filterValues));
  });

  return newData;
};

export default createSelector(data, filters, originalData, getFilterStatus);
