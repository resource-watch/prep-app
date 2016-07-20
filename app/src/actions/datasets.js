import {
  DATASET_LIST_RECEIVED,
  DATASET_FETCH_ERROR,
  DATASET_DETAIL_RECEIVED
} from '../constants';

const { apiUrl } = config;

export function getDatasets() {
  return dispatch => {
    fetch(`${apiUrl}/data/datasets/list.json`)
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
    fetch(`${apiUrl}/data/datasets/${slug}.json`)
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
