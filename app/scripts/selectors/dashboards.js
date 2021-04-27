import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

const dashboards = state => state.dashboards.list;
const topics = state => state.dashboards.topics;
const geographies = state => state.dashboards.geographies;
const searchTerm = state => state.dashboards.searchTerm;

export const getDashboards = createSelector(
  dashboards,
  topics,
  geographies,
  searchTerm,
(dashboards, topics, geographies, searchTerm) => {
  if (searchTerm) {
    const fuse = new Fuse(dashboards, {
      keys: ['title']
    });
    return fuse.search(searchTerm);
  }

  return dashboards.filter((dashboard) => {
    if (!topics.length && !geographies.length) {
      return true;
    }

    if (topics.length) {
      const found = dashboard.tags.some(tag => topics.indexOf(tag) !== -1);
      if (found) {
        return true;
      }
    }

    if (geographies.length) {
      const found = dashboard.locations.some(tag => geographies.indexOf(tag) !== -1);
      if (found) {
        return true;
      }
    }

    return false;
  });
});
