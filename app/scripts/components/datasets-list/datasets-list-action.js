import wriAPISerializer from 'helpers/wri-api-serializer';
import qs from 'query-string';
import {
  FETCH_DATASETS_REQUEST,
  FETCH_DATASETS_FAILURE,
  FETCH_DATASETS_SUCCESS,
  TOGGLE_DATASET
} from './datasets-list-constants';

export function requestDatasets() {
  return {
    type: FETCH_DATASETS_REQUEST
  };
}

export function receiveDatasets(json) {
  return {
    type: FETCH_DATASETS_SUCCESS,
    payload: wriAPISerializer(json.data)
  };
}

export function failureDatasets(error) {
  return {
    type: FETCH_DATASETS_FAILURE,
    payload: error
  };
}

export function fetchDatasets() {
  return dispatch => {
    dispatch(requestDatasets());
    const params = {
      application: ['prep'].join(','),
      includes: ['metadata', 'layer', 'vocabulary'].join(','),
      'page[size]': 999,
      status: 'saved',
      published: true,
      env: config.datasetEnv || 'production'
    };
    const url = `${config.apiUrlRW}/dataset?${qs.stringify(params)}`;
    return fetch(url)
      .then(response => {
        if (response.ok) return response.json();
        throw Error(response.statusText);
      })
      .then(json => dispatch(receiveDatasets(json)))
      .catch(error => dispatch(failureDatasets(error)));
  };
}

export function toggleDataset(dataset) {
  return {
    type: TOGGLE_DATASET,
    payload: dataset
  };
}
