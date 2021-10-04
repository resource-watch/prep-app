/* eslint-disable camelcase */
import compact from 'lodash/compact';
import { createSelector } from 'reselect';
import { CATEGORIES } from './core-datasets-list-constants';
import { getActiveLayersForMap, checkNexLocaGeeDataset } from '../explore-map/explore-map-selector';

const getAllDatasets = state => state.explorePage.datasets.items;
const getAllCoreDatasets = state => state.explorePage.coreDatasets.items;
const getLocationFilter = state => state.explorePage.coreDatasets.location;

export const getCoreDatasets = createSelector(
  [getAllDatasets, getAllCoreDatasets, getActiveLayersForMap],
  (allDatasets, coreDatasets, activeLayers) => {
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

    const result = allDatasets.filter((dataset) => coreDatasetsResult.includes(dataset.id));

    /**
     * Filtering and grouping core datasets in order to don't repeat NEX LOCA GEE datasets
     * Date: January 2021
     */
    const resultFiltered = result.filter((d) => d.vocabulary.find((v) => !v.tags.includes('nexlocagee')));

    // Grouping datasets for NEXLOCAGEE
    const nexLocaGeeDatasets = result.filter((d) => d.vocabulary.find((v) => v.tags.includes('nexlocagee')));
    const nexLocaGeeIndicators = [];

    nexLocaGeeDatasets.forEach((n) => {
      const exists = nexLocaGeeIndicators.find((d) => d.id === n.id)
        || nexLocaGeeIndicators.find((d) => checkNexLocaGeeDataset(n.id, d));
      const hasActiveLayer = activeLayers.find((l) => l.dataset === n.id);

      if (hasActiveLayer) {
        nexLocaGeeIndicators.push(n);
      }

      // Absolute low as base
      else if (n.metadata[0].info.absolute && n.id === n.metadata[0].info.absolute.low && !exists) {
        nexLocaGeeIndicators.push(n);
      }
    });

    // Returning core datasets without nex loca gee datasets, and then join grouped nex loca gee indicators
    return [
      ...resultFiltered,
      ...nexLocaGeeIndicators,
    ];
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
            title: subgroup.subcategory === 'Precipitations' ? 'Precipitation' : subgroup.subcategory // I can't change it from API
          };
        }
        return null;
      }))
    }));
    return result;
  }
);

export default { getCoreDatasets };
