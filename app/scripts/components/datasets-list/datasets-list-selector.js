import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import flattenDeep from 'lodash/flattenDeep';
import { CORE_DATASETS } from './datasets-list-constants';

const getAllDatasets = (state) => state.datasetsList.items;
const getLocationFilter = (state) => state.coreDatasetsFilter.location;
const getSearchQuery = (state) => state.datasetsList.searchQuery;

export const getActiveDatasets = createSelector(
  getAllDatasets,
  (datasets) => filter(datasets, { isLayerActive: true })
);

export const getCoreDatasets = createSelector(
  [getAllDatasets, getLocationFilter],
  (datasets, location) => {
    const coreDatasets = [];

    CORE_DATASETS.forEach(cd => cd.subgroups.forEach(sg => sg.datasets.forEach(d => coreDatasets.push(d))));

    return datasets.filter((dataset) => {
      const { vocabulary } = dataset;
      const tags = vocabulary && vocabulary.length ? vocabulary[0].tags || [] : [];
      return coreDatasets.includes(dataset.id) && tags.includes(location);
    });
  }
);

export const filteredDatasets = createSelector(
  [getAllDatasets, getSearchQuery],
  (datasets, searchQuery) => {
    if (!searchQuery || searchQuery === '') return datasets;
    const regex = new RegExp(`^${searchQuery}`, 'gi');
    return datasets.filter((dataset) => {
      return regex.test(dataset.name);
    });
  }
);