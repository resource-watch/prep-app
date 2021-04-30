import sortBy from 'lodash/sortBy';

import TOPICS from 'pages/explore/explore-dataset-filters/data/topics.json';
import GEOGRAPHIES from 'pages/explore/explore-dataset-filters/data/geographies.json';
import DATATYPES from 'pages/explore/explore-dataset-filters/data/data-types.json';
import PERIODS from 'pages/explore/explore-dataset-filters/data/periods.json';


/**
 * Recursively sort a tree of collections
 * @param {object[]} collection Collection to sort
 * @param {string} attribute Attribute to sort with
 */
const recursivelySortBy = (collection, attribute) => sortBy(collection, attribute).map((subCollection) => {
  const res = Object.assign({}, subCollection);

  if (subCollection.children) {
    // eslint-disable-next-line no-param-reassign
    res.children = sortBy(subCollection.children, attribute);
  }

  return res;
});

class DatasetFilterService {
  static getTopics() {
    return new Promise(resolve => resolve({ topics: recursivelySortBy(TOPICS, 'label') }));
  }
  static getGeographies() {
    return new Promise(resolve => resolve({ geographies: recursivelySortBy(GEOGRAPHIES, 'label') }));
  }
  static getDataTypes() {
    return new Promise(resolve => resolve({ dataTypes: recursivelySortBy(DATATYPES, 'label') }));
  }
  static getPeriods() {
    return new Promise(resolve => resolve({ periods: recursivelySortBy(PERIODS, 'label') }));
  }
}

export default DatasetFilterService;
