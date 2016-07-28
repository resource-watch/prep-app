import {
  DATASET_LIST_RECEIVED,
  DATASET_FETCH_ERROR,
  DATASET_DETAIL_RECEIVED
} from '../constants';

import { updateURL } from './datamap';
const { apiUrlRW } = config;

export function getDatasets(defaultActiveLayers) {
  return dispatch => {
    fetch(`${apiUrlRW}/datasets`)
      .then(response => {
        if (response.ok) return response.json();
        return {};
      })
      .then(data => {
        const layers = data || [];
        if (layers.length) {
          for (let i = 0, length = layers.length; i < length; i++) {
            if (defaultActiveLayers && defaultActiveLayers.indexOf(layers[i].id) > -1) {
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
      .catch((err) => {
        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}

export function getDatasetBySlug(datasetId) {
  return dispatch => {
    fetch(`${apiUrlRW}/widgets?app=prep&default=true&dataset=${datasetId}`)
      .then(response => {
        if (response.ok) return response.json();
        return {};
      })
      .then(data => {
        fetch(`${apiUrlRW}/widgets/${data[0].id}`)
          .then(response => {
            if (response.ok) return response.json();
            return {};
          })
          .then(widget => {
            dispatch({
              type: DATASET_DETAIL_RECEIVED,
              payload: { data: widget }
            });
          });
      })
      .catch((err) => {
        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}
