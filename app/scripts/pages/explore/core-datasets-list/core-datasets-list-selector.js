import compact from 'lodash/compact';
import { createSelector } from 'reselect';
import { CATEGORIES } from './core-datasets-list-constants.js';

const getAllDatasets = state => state.explorePage.datasets.items;
const getAllCoreDatasets = state => state.explorePage.coreDatasets.items;
const getLocationFilter = state => state.explorePage.coreDatasets.location;

export const getCoreDatasets = createSelector(
  [getAllDatasets, getAllCoreDatasets, getLocationFilter],
  (allDatasets, coreDatasets, location) => {
    const coreDatasetsResult = [];
    const searchDatasetsRecursive = (categories, items) => {
      items.forEach((item) => {
        const { subcategories } = categories;
        const { dataset_ids } = item;
        if (dataset_ids && dataset_ids.length) dataset_ids.forEach(d => coreDatasetsResult.push(d));
        if (subcategories && subcategories.length) searchDatasetsRecursive(subcategories);
      });
    };

    searchDatasetsRecursive(CATEGORIES, coreDatasets);

    return allDatasets.filter((dataset) => {
      const { vocabulary } = dataset;
      const tags = vocabulary && vocabulary.length ? vocabulary[0].tags || [] : [];
      return coreDatasetsResult.includes(dataset.id);
    });
  }
);

export const getParsedCoreDatasets = createSelector(
  [getAllCoreDatasets, getLocationFilter],
  (coreDatasets, location) => {
    const result = CATEGORIES.map((c, i) => ({
      ...c,
      id: i + 1,
      title: c.name,
      subgroups: compact(c.subcategories.map((s, j) => {
        const subgroup = coreDatasets.find(d => d.subcategory === s.value && d.country_iso === location);
        if (subgroup) {
          return {
            id: (j + 1) + ((i + 1) * 10),
            datasets: subgroup.dataset_ids,
            slug: subgroup.tags,
            title: subgroup.subcategory
          };
        }
        return null;
      }))
    }));
    return result;
  }
);

export default { getCoreDatasets };
