import qs from 'query-string';
import { createAction, createThunkAction } from 'redux-tools';
import { replace } from 'react-router-redux';
import { bindActionCreators } from 'redux';

// Update URL
export const updateURLParams = createThunkAction('updateURLParams', () => (dispatch, getState) => {
  const { explorePage } = getState();
  const query = {
    ...explorePage.map,
    tab: explorePage.tab,
    filterQuery: explorePage.datasets.filterQuery,
    location: explorePage.coreDatasets.location
  };
  console.log(query);
  dispatch(replace({ pathname: '/explore', query }));
});

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

// URL
export const initialURLParams = createThunkAction('initialURLParams', () => (dispatch, getState) => {
  const { routing } = getState();
  const {
    basemap, labels, boundaries,
    zoom, lat, lng,
    location, tab
  } = routing.locationBeforeTransitions.query;
  const query = routing.locationBeforeTransitions.query.filterQuery;

  if (zoom && lat && lng) dispatch(setMapParams({ zoom: parseInt(zoom, 10), lat: parseFloat(lat), lng: parseFloat(lng) }));
  if (basemap) dispatch(setBasemap(basemap));
  if (labels) dispatch(setLabels(labels));
  if (boundaries) dispatch(setBoundaries(boundaries === 'true'));
  if (location) dispatch(setLocation(location));
  if (query) dispatch(filterQuery(query));
  if (tab) dispatch(setTab(tab));
});
