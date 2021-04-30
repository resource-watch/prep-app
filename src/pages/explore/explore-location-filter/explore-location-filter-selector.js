import compact from 'lodash/compact';
import { createSelector } from 'reselect';

const getAllCoreDatasets = state => state.explorePage.coreDatasets.items;
const getAllLocations = state => state.explorePage.locations.items;

export const getCoreDatasetLocations = createSelector(
  [getAllCoreDatasets, getAllLocations],
  (coreDatasets, locations) => {
    const countriesISO = compact(coreDatasets.map(c => c.country_iso));
    const uniqCountries = Array.from(new Set(countriesISO));
    const result = [];

    // Adding global ISO
    result.push({
      geostoreId: 0,
      name: 'Global',
      iso: 'GLOBAL'
    });

    locations
      .filter(l => l.name && uniqCountries.includes(l.iso))
      .forEach(l => result.push(l));

    return result.map(r => ({
      id: r.geostoreId,
      label: r.name,
      value: r.iso
    }));
  }
);
