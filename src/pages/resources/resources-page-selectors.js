import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import { RESOURCES_CATEGORIES } from './resources-page-constants';

const getResources = state => state.resourcePage.resources;

const allowedTypes = RESOURCES_CATEGORIES.map(category => category.value);

export const getFilteredResources = createSelector(
  [getResources],
  (resources) => {
    const filteredResources = sortBy(resources.filter(resource => allowedTypes.includes(resource.resource_type)), (r) => r.title.trim());
    return groupBy(filteredResources, 'resource_type');
  }
);

export default { getFilteredResources };
