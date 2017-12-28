import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import flattenDeep from 'lodash/flattenDeep';
import { CORE_DATASETS } from './datasets-list-constants';

const getAllDatasets = (state) => state.datasetsList.items;
const getLocationFilter = (state) => state.coreDatasetsFilter.location;

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