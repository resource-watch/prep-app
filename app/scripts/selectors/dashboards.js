import { createSelector } from 'reselect';

const dashboards = state => state.dashboards.list;
const topics = state => state.dashboards.topics;
const geographies = state => state.dashboards.geographies;

/* eslint-disable-next-line import/prefer-default-export */
export const getDashboards = createSelector(
  dashboards,
  topics,
  geographies,
  (dashboards, topics, geographies) => dashboards.filter((dashboard) => {
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
  })
);
