import { createSelector } from 'reselect';
import { coreDatasets } from './core-datasets-list-constants';

const getAllDatasets = state => state.explorePage.datasets.items;
const getLocationFilter = state => state.explorePage.location;

export const getCoreDatasets = createSelector(
  [getAllDatasets, getLocationFilter],
  (datasets, location) => {
    const coreDatasetsResult = [];

    coreDatasets.forEach(cd => cd.subgroups.forEach(sg => sg.datasets.forEach(d => coreDatasetsResult.push(d))));

    return datasets.filter((dataset) => {
      const { vocabulary } = dataset;
      const tags = vocabulary && vocabulary.length ? vocabulary[0].tags || [] : [];
      return coreDatasetsResult.includes(dataset.id) && tags.includes(location);
    });
  }
);

export default { getCoreDatasets };
