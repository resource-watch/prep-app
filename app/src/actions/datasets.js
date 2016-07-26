import {
  DATASET_LIST_RECEIVED,
  DATASET_FETCH_ERROR,
  DATASET_DETAIL_RECEIVED
} from '../constants';

import { updateURL } from './datamap';
const { apiUrl } = config;

export function getDatasets(defaultActiveLayers) {
  return dispatch => {
    fetch(`${apiUrl}/data/datasets/list.json`)
      .then(response => {
        if (response.ok) return response.json();
        return {};
      })
      .then(data => {
        const layers = data && data.layers || [];
        if (layers.length && defaultActiveLayers && defaultActiveLayers.length) {
          for (let i = 0, length = layers.length; i < length; i++) {
            if (defaultActiveLayers.indexOf(layers[i].slug) > -1) {
              layers[i].active = true;
            } else {
              layers[i].active = false;
            }
          }
        }
        dispatch({
          type: DATASET_LIST_RECEIVED,
          payload: {
            data: layers
          }
        });
        dispatch(updateURL());
      })
      .catch((error) => {
        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: error
        });
      });
  };
}

export function getDatasetBySlug(slug) {
  return dispatch => {
    fetch(`${apiUrl}/data/datasets/${slug}.json`)
      .then(response => {
        if (response.ok) return response.json();
        return {};
      })
      .then(data => {
        dispatch({
          type: DATASET_DETAIL_RECEIVED,
          payload: { data }
        });
      })
      .catch((error) => {
        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: error
        });
      });
  };
}
