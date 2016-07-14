import {
  DATASET_LIST_RECEIVED,
  DATASET_FETCH_ERROR,
  DATASET_DETAIL_RECEIVED,
  SWITCH_CHANGED,
  SET_SWITCH_STATUS
} from '../constants';

export function getDatasets() {
  return dispatch => {
    fetch('http://localhost:9000/data/datasets/list.json')
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(data => {
        const layers = data && data.layers || [];
        dispatch({
          type: DATASET_LIST_RECEIVED,
          payload: {
            data: layers
          }
        });
      })
      .catch(function(error) {
        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: error
        });
      });
  };
}

export function getDatasetBySlug(slug) {
  return dispatch => {
    fetch(`http://localhost:9000/data/datasets/${slug}.json`)
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(data => {
        dispatch({
          type: DATASET_DETAIL_RECEIVED,
          payload: { data }
        });
      })
      .catch(function(error) {
        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: error
        });
      });
  };
}

export function switchChange(id) {
  return {
    type: SWITCH_CHANGED,
    payload: { id }
  };
}

export function setSwitchStatus(id, status) {
  return {
    type: SET_SWITCH_STATUS,
    payload: { id, status }
  };
}
