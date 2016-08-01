import 'whatwg-fetch';
import {
  DATASET_LIST_RECEIVED,
  DATASET_FETCH_ERROR,
  DATASET_LAYER_FETCH_ERROR,
  DATASET_DETAIL_RECEIVED,
  DATASET_LAYER_RECEIVED
} from '../constants';

import { updateURL } from './datamap';

export function getDatasetLayer(dataset) {
  return dispatch => {
    fetch(`${config.apiUrlRW}/layers/${dataset.layers[0].layer_id}`)
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
    fetch(`${config.apiUrlRW}/datasets?app=prep`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        const datasets = data || [];
        if (datasets.length) {
          for (let i = 0, dsLength = datasets.length; i < dsLength; i++) {
            if (defaultActiveLayers &&
              defaultActiveLayers.indexOf(datasets[i].id) > -1) {
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
    fetch(`${config.apiUrlRW}/widgets?app=prep&default=true&dataset=${datasetId}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        if (data.length) {
          fetch(`${config.apiUrlRW}/widgets/${data[0].id}`)
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
        } else {
          dispatch({
            type: DATASET_DETAIL_RECEIVED,
            payload: {
              data: {
                name: 'Contact us',
                description: 'There was an error getting the visualization, ' +
                  'please contact us hello@vizzuality.com',
                dataset_id: datasetId
              }
            }
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}
