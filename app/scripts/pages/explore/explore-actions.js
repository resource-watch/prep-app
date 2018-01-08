import qs from 'query-string';
import { createAction, createThunkAction } from 'redux-tools';
import { replace } from 'react-router-redux';
import datasetsMock from './mocks/datasets-spec.json';

// Update URL
export const updateURLParams = createThunkAction('updateURLParams', () => (dispatch, getState) => {
  const { explorePage } = getState();
  const { tab, datasets, coreDatasets } = explorePage;
  const { location } = coreDatasets;
  const { filterQuery, activeDatasets } = datasets;
  const activeDatasetsResult = activeDatasets && activeDatasets.length ?
    activeDatasets.map(({ id, opacity, visibility, zIndex }) => `${id}|${opacity}|${visibility}|${zIndex}`) : [];

  const query = {
    ...explorePage.map,
    tab,
    filterQuery,
    location,
    activeDatasets: activeDatasetsResult
  };

  dispatch(replace({ pathname: '/explore', query }));
});

export const setTab = createThunkAction('setTab', () => (dispatch) => {
  dispatch(updateURLParams());
});

// Location filter
export const setLocation = createThunkAction('setLocation', () => (dispatch) => {
  dispatch(updateURLParams());
});

// Datasets list
export const setActiveDatasets = createAction('setActiveDatasets');
export const updateActiveDatasets = createAction('updateActiveDatasets');
export const receiveDatasets = createAction('receiveDatasets');
export const failureDatasets = createAction('failureDatasets');
export const fetchDatasets = createThunkAction('fetchDatasets', () => (dispatch) => {
  dispatch(receiveDatasets(datasetsMock));
  dispatch(updateActiveDatasets());
  // const params = {
  //   application: ['prep'].join(','),
  //   includes: ['metadata', 'layer', 'vocabulary', 'widget'].join(','),
  //   'page[size]': 999,
  //   status: 'saved',
  //   published: true,
  //   env: config.datasetEnv || 'production'
  // };
  // const url = `${config.apiUrlRW}/dataset?${qs.stringify(params)}`;
  // return fetch(url)
  //   .then((response) => {
  //     if (response.ok) return response.json();
  //     throw Error(response);
  //   })
  //   .then((json) => {
  //     dispatch(receiveDatasets(json));
  //     dispatch(updateActiveDatasets());
  //   })
  //   .catch(error => dispatch(failureDatasets(error)));
});
export const toggleInfo = createAction('toggleInfo');
export const toggleDataset = createThunkAction('toggleDataset', () => (dispatch) => {
  dispatch(updateActiveDatasets());
  dispatch(updateURLParams());
});
export const filterQuery = createThunkAction('filterQuery', () => (dispatch) => {
  dispatch(updateURLParams());
});

// Map
export const setMapParams = createThunkAction('setMapParams', () => (dispatch) => {
  dispatch(updateURLParams());
});
export const setBasemap = createThunkAction('setBasemap', () => (dispatch) => {
  dispatch(updateURLParams());
});
export const setLabels = createThunkAction('setLabels', () => (dispatch) => {
  dispatch(updateURLParams());
});
export const setBoundaries = createThunkAction('setBoundaries', () => (dispatch) => {
  dispatch(updateURLParams());
});

// URL
export const initialURLParams = createThunkAction('initialURLParams', () => (dispatch, getState) => {
  const { routing } = getState();
  const {
    basemap, labels, boundaries,
    zoom, lat, lng,
    location, tab,
    activeDatasets
  } = routing.locationBeforeTransitions.query;
  const query = routing.locationBeforeTransitions.query.filterQuery;

  if (zoom && lat && lng) dispatch(setMapParams({ zoom: parseInt(zoom, 10), lat: parseFloat(lat), lng: parseFloat(lng) }));
  if (basemap) dispatch(setBasemap(basemap));
  if (labels) dispatch(setLabels(labels));
  if (boundaries) dispatch(setBoundaries(boundaries === 'true'));
  if (location) dispatch(setLocation(location));
  if (query) dispatch(filterQuery(query));
  if (tab) dispatch(setTab(tab));

  if (activeDatasets) {
    const activeDatasetsResult = typeof activeDatasets === 'string' ? [activeDatasets] : activeDatasets;
    dispatch(setActiveDatasets(activeDatasetsResult.map((s) => {
      const parsedSt = s.split('|');
      return {
        id: parsedSt[0],
        opacity: parseInt(parsedSt[1], 10),
        visibility: parsedSt[2] === 'true',
        zIndex: parseInt(parsedSt[3], 10)
      };
    })));
  }
});
