import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import flattenDeep from 'lodash/flattenDeep';
import { CORE_DATASETS } from './datasets-list-constants';

export const getAllDatasets = (state) => state.datasetsList.items;

export const getActiveDatasets = createSelector(
  getAllDatasets,
  (datasets) => filter(datasets, { isLayerActive: true })
);

export const getCoreDatasets = createSelector(
  getAllDatasets,
  (datasets) => {
    const result = flattenDeep(CORE_DATASETS.map(t => t.subgroups.map(sg => sg.datasets))) || [];
    return datasets.filter(l => result.includes(l.id));
  }
);