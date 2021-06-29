import { createSelector } from 'reselect';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';

const resourcesList = state => state.resources.list;

export const firstTypeSelector = createSelector(
  resourcesList,
  items => sortBy(filter(items, { resource_type: 'Understanding impacts of climate change' }), 'title')
);

export const secondTypeSelector = createSelector(
  resourcesList,
  items => sortBy(filter(items, { resource_type: 'Climate resilience tools and services' }), 'title')
);

export const thirdTypeSelector = createSelector(
  resourcesList,
  items => sortBy(filter(items, { resource_type: 'Climate data portals' }), 'title')
);
