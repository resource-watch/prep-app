import {
  DATASET_LIST_RECEIVED,
  DATASET_FETCH_ERROR,
  DATASET_LAYER_FETCH_ERROR,
  DATASET_DETAIL_RECEIVED,
  DATASET_LAYER_RECEIVED
} from '../constants';

import { updateURL } from './datamap';
const { apiUrlRW } = config;


export function getDatasetLayer(dataset) {
  return dispatch => {
    fetch(`${apiUrlRW}/layers/${dataset.layers[0].layer_id}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        dispatch({
          type: DATASET_LAYER_RECEIVED,
          payload: data
        });
      })
      .catch((err) => {
        dispatch({
          type: DATASET_LAYER_FETCH_ERROR,
          payload: {
            id: dataset.id,
            error: err.message
          }
        });
        dispatch(updateURL());
      });
  };
}

export function getActiveDatasetLayers(datasets) {
  return dispatch => {
    for (let i = 0, dsLength = datasets.length; i < dsLength; i++) {
      if (datasets[i].active) {
        dispatch(getDatasetLayer(datasets[i]));
      }
    }
  };
}

export function getDatasets(defaultActiveLayers) {
  return dispatch => {
    fetch(`${apiUrlRW}/datasets?app=prep`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        const datasets = data || [];
        if (datasets.length) {
          for (let i = 0, dsLength = datasets.length; i < dsLength; i++) {
            if (defaultActiveLayers && defaultActiveLayers.indexOf(datasets[i].id) > -1) {
              datasets[i].active = true;
            } else {
              datasets[i].active = false;
            }
          }
        }
        dispatch({
          type: DATASET_LIST_RECEIVED,
          payload: {
            data: datasets
          }
        });
        dispatch(getActiveDatasetLayers(datasets));
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

export function getDatasetDefaultWidget(datasetId) {
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
            throw new Error(response.statusText);
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
