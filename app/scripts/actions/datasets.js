import 'whatwg-fetch';
import {
  DATASET_LIST_RECEIVED,
  DATASET_LIST_RESET,
  DATASET_FETCH_ERROR,
  DATASET_LAYER_FETCH_ERROR,
  DATASET_WIDGET_RECEIVED,
  DATASET_DETAIL_RECEIVED,
  DATASET_METADATA_RECEIVED,
  DATASET_LAYER_RECEIVED,
  DATASET_SET_FILTER
} from '../constants';

import { updateURL } from './links';

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

export function setDatasetsTagFilter(filter, tag) {
  return {
    type: DATASET_SET_FILTER,
    payload: { filter, tag }
  };
}

export function getDatasets(defaultActiveLayers) {
  return dispatch => {
    fetch(`${config.apiUrlRW}/datasets?app=prep&includes=metadata`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        const datasets = data || [];
        if (datasets.length) {
          for (let i = datasets.length - 1; i > 0; i--) {
            if (defaultActiveLayers) {
              const index = defaultActiveLayers.indexOf(datasets[i].id);
              if (index > -1) {
                datasets[i].active = true;
                datasets[i].index = index + 1;
              }
              datasets[i].opacity = 1;
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
        dispatch({
          type: DATASET_SET_FILTER,
          payload: {}
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
export function resetDatasetList() {
  return {
    type: DATASET_LIST_RESET
  };
}

export function getDatasetById(datasetId, includesData) {
  const includes = includesData || [];
  const includeQuery = includes.length > 0 ?
    `&includes=${includes.join(',')}` :
    '';

  return dispatch => {
    fetch(`${config.apiUrlRW}/datasets/${datasetId}?app=prep${includeQuery}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        if (data) {
          dispatch({
            type: DATASET_DETAIL_RECEIVED,
            payload: { data }
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

export function getDatasetDefaultWidget(datasetId) {
  return dispatch => {
    fetch(`${config.apiUrlRW}/widgets?app=prep&default=true&dataset=${datasetId}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        if (data.data.length) {
          for (let i = 0, wLength = data.data.length; i < wLength; i++) {
            fetch(`${config.apiUrlRW}/widgets/${data.data[i].id}`)
            .then(response => {
              if (response.ok) return response.json();
              throw new Error(response.statusText);
            })
            .then(widget => {
              dispatch({
                type: DATASET_WIDGET_RECEIVED,
                payload: { data: widget.data }
              });
            });
          }
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

export function getDatasetMetadata(datasetId) {
  return dispatch => {
    fetch(`${config.apiUrlRW}/metadata/${datasetId}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        if (data.data[0]) {
          dispatch({
            type: DATASET_METADATA_RECEIVED,
            payload: data.data[0]
          });
        } else {
          dispatch({
            type: DATASET_METADATA_RECEIVED,
            payload: {
              id: datasetId,
              attributes: {
                dataset: datasetId,
                info: {
                  attributes: {
                    title: 'Dataset detail',
                    message: 'There is not metadata for this dataset'
                  }
                }
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
