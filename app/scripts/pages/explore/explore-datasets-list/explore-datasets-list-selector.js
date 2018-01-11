import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import find from 'lodash/find';

const getAllDatasets = state => state.explorePage.datasets.items;
const getFilterQuery = state => state.explorePage.datasets.filterQuery;
const getFilters = state => state.explorePage.datasetFilters.filters;
const getGraphs = state => state.explorePage.datasetFilters.graphs;

export const getActiveDatasets = createSelector(
  getAllDatasets,
  datasets => filter(datasets, { isLayerActive: true })
);

export const filteredDatasets = createSelector(
  [getAllDatasets, getFilterQuery, getFilters, getGraphs],
  (datasets, filterQuery, filters, graphs) => {
    const { topics, geographies, dataTypes } = filters;
    const enabledFilters = (((topics || []).length) || ((geographies || []).length) || ((dataTypes || []).length));

    const existsQuery = (filterQuery && filterQuery !== '');
    if ((!existsQuery) && !enabledFilters) return datasets;
    const regex = new RegExp(`${filterQuery}`, 'gi');

    return datasets.filter((dataset) => {
      let searchFilterPassed = false;
      let conceptsCheckPassed = true;

      if (existsQuery) {
        if (regex.test(dataset.name)) searchFilterPassed = true;

        if (dataset.metadata.length && !searchFilterPassed) {
          const metadataObj = dataset.metadata[0] || {};
          const infoObj = metadataObj.info;

          const nameCheck = infoObj.name && regex.test(infoObj.name);
          const functionsCheck = infoObj.functions && regex.test(infoObj.functions);
          const sourceCheck = metadataObj.source && regex.test(metadataObj.source);

          if (nameCheck || functionsCheck || sourceCheck) searchFilterPassed = true;
        }

        if (dataset.vocabulary.length && !searchFilterPassed) {
          const vocabulary = dataset.vocabulary[0];
          const tagsCheck = vocabulary.tags.find(tag => regex.test(tag));
          if (tagsCheck) searchFilterPassed = true;
        }
      }

      if (graphs && enabledFilters) conceptsCheckPassed = graphs.includes(dataset.id);

      const searchCheck = (filterQuery && searchFilterPassed) || !filterQuery;

      return searchCheck && conceptsCheckPassed;
    });
  }
);

export const getSelectedDataset = createSelector(
  getAllDatasets,
  datasets => find(datasets, { isSelected: true })
);
