import {
  DATASET_LIST_RECEIVED,
  DATASET_DETAIL_RECEIVED,
  SWITCH_CHANGED,
  SET_SWITCH_STATUS
} from '../constants';

export function getDatasets() {
  return dispatch => {
    fetch('/data/datasets/list.json')
      .then(response => (response.json()))
      .then(data => {
        dispatch({
          type: DATASET_LIST_RECEIVED,
          payload: {
            data: data.layers
          }
        });
      }
    );
  };
}

export function getDatasetBySlug(slug) {
  return dispatch => {
    fetch(`/data/datasets/${slug}.json`)
      .then(response => (response.json()))
      .then(data => {
        dispatch({
          type: DATASET_DETAIL_RECEIVED,
          payload: { data }
        });
      }
    );
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
