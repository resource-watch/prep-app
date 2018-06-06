import { createSelector } from 'reselect';
import coreDatasets from './core-datasets-list-data.json';

const getAllDatasets = state => state.explorePage.datasets.items;
const getLocationFilter = state => state.explorePage.coreDatasets.location;

export const getCoreDatasets = createSelector(
  [getAllDatasets, getLocationFilter],
  (allDatasets, location) => {
    const coreDatasetsResult = [];
    const searchDatasetsRecursive = (items) => {
      if (items && items.length) {
        items.forEach((item) => {
          const { subgroups, datasets } = item;
          if (datasets && datasets.length) datasets.forEach(d => coreDatasetsResult.push(d));
          if (subgroups && subgroups.length) searchDatasetsRecursive(subgroups);
        });
      }
    };

    searchDatasetsRecursive(coreDatasets);

    return allDatasets.filter((dataset) => {
      const { vocabulary } = dataset;
      const tags = vocabulary && vocabulary.length ? vocabulary[0].tags || [] : [];
      return coreDatasetsResult.includes(dataset.id) && tags.includes(location);
    });
  }
);

export default { getCoreDatasets };
