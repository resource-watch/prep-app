import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import find from 'lodash/find';

const getAllDatasets = state => state.explorePage.datasets.items;
const getFilterQuery = state => state.explorePage.datasets.filterQuery;

export const getActiveDatasets = createSelector(
  getAllDatasets,
  datasets => filter(datasets, { isLayerActive: true })
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
