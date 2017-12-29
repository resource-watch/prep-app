import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import find from 'lodash/find';
import { CORE_DATASETS } from './datasets-list-constants';

const getAllDatasets = state => state.datasetsList.items;
const getLocationFilter = state => state.coreDatasetsFilter.location;
const getFilterQuery = state => state.datasetsList.filterQuery;

export const getActiveDatasets = createSelector(
  getAllDatasets,
  datasets => filter(datasets, { isLayerActive: true })
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
  [getAllDatasets, getFilterQuery],
  (datasets, filterQuery) => {
    if (!filterQuery || filterQuery === '') return datasets;
    const regex = new RegExp(`${filterQuery}`, 'gi');
    return datasets.filter((dataset) => {
      let containsQuery = false;
      const metadata = dataset.metadata && dataset.metadata.length ? dataset.metadata[0] : null;
      const info = metadata && metadata.info ? metadata.info : null;
      if (info) {
        containsQuery = regex.test(info.title) || regex.test(info.functions) || regex.test(info.description);
      }
      if (!containsQuery && metadata) {
        containsQuery = regex.test(metadata.name) || regex.test(metadata.description);
      }
      if (containsQuery) return containsQuery;
      return regex.test(dataset.name);
    });
  }
);

export const getSelectedDataset = createSelector(
  getAllDatasets,
  datasets => find(datasets, { isSelected: true })
);
