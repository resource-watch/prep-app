import qs from 'query-string';
import { wriAPISerializer } from 'helpers/wri-api-serializer';
import {
  FETCH_DATASETS_REQUEST,
  FETCH_DATASETS_FAILURE,
  FETCH_DATASETS_SUCCESS,
  TOGGLE_DATASET_LAYER,
  TOGGLE_DATASET_INFO,
  FILTER_DATASETS_QUERY
} from './datasets-list-constants';

export function requestDatasets() {
  return {
    type: FETCH_DATASETS_REQUEST
  };
}

export function receiveDatasets(json) {
  return {
    type: FETCH_DATASETS_SUCCESS,
    payload: wriAPISerializer(json)
  };
}

export function failureDatasets(error) {
  return {
    type: FETCH_DATASETS_FAILURE,
    payload: error
  };
}

export function fetchDatasets() {
  return (dispatch) => {
    dispatch(requestDatasets());
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
        throw Error(response.statusText);
      })
      .then(json => dispatch(receiveDatasets(json)))
      .catch(error => dispatch(failureDatasets(error)));
  };
}

export function toggleDataset(dataset) {
  return {
    type: TOGGLE_DATASET_LAYER,
    payload: dataset
  };
}

export function toggleInfo(dataset) {
  return {
    type: TOGGLE_DATASET_INFO,
    payload: dataset
  };
}

export function filterQuery(query) {
  return {
    type: FILTER_DATASETS_QUERY,
    payload: query || ''
  };
}
