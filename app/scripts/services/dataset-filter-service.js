import sortBy from 'lodash/sortBy';

import TOPICS from 'pages/explore/explore-dataset-filters/data/topics.json';
import GEOGRAPHIES from 'pages/explore/explore-dataset-filters/data/geographies.json';
import DATATYPES from 'pages/explore/explore-dataset-filters/data/data-types.json';
import PERIODS from 'pages/explore/explore-dataset-filters/data/periods.json';


class DatasetFilterService {
  static getTopics() {
    return new Promise(resolve => resolve({ topics: sortBy(TOPICS, 'label') }));
  }
  static getGeographies() {
    return new Promise(resolve => resolve({ geographies: sortBy(GEOGRAPHIES, 'label') }));
  }
  static getDataTypes() {
    return new Promise(resolve => resolve({ dataTypes: sortBy(DATATYPES, 'label') }));
  }
  static getPeriods() {
    return new Promise(resolve => resolve({ periods: sortBy(PERIODS, 'label') }));
  }
}

export default DatasetFilterService;
