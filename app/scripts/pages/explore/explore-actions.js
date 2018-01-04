import qs from 'query-string';
import { createAction, createThunkAction } from 'redux-tools';

export const setTab = createAction('setTab');

// Location filter
export const setLocation = createAction('setLocation');

// Datasets list
export const receiveDatasets = createAction('receiveDatasets');
export const failureDatasets = createAction('failureDatasets');
export const fetchDatasets = createThunkAction('fetchDatasets', () => (dispatch) => {
  const params = {
    application: ['prep'].join(','),
    includes: ['metadata', 'layer', 'vocabulary', 'widget'].join(','),
    'page[size]': 999,
    status: 'saved',
    published: true,
    env: config.datasetEnv || 'production'
  };
  const url = `${config.apiUrlRW}/dataset?${qs.stringify(params)}`;
  return fetch(url)
    .then((response) => {
      if (response.ok) return response.json();
      throw Error(response);
    })
    .then(json => dispatch(receiveDatasets(json)))
    .catch(error => dispatch(failureDatasets(error)));
});
export const toggleInfo = createAction('toggleInfo');
export const toggleDataset = createAction('toggleDataset');
export const filterQuery = createAction('filterQuery');

// Map
export const setMapParams = createAction('setMapParams');
export const setBasemap = createAction('setBasemap');
export const setLabels = createAction('setLabels');
export const setBoundaries = createAction('setBoundaries');
