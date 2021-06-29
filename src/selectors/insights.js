import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

const insights = state => state.insights.list;
const searchTerm = state => state.insights.searchTerm;

export const getInsights = createSelector(
  insights,
  searchTerm,
(insights,searchTerm) => {
  if (searchTerm) {
    const fuse = new Fuse(insights, {
      keys: ['title']
    });
    return fuse.search(searchTerm);
  }

  return insights;
});
