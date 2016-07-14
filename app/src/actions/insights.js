import {
  INSIGHTS_FETCH_ERROR,
  INSIGHTS_LIST_RECEIVED,
  INSIGHTS_DETAIL_RECEIVED
} from '../constants';

const { apiUrl } = config;

export function getInsightsList() {
  return dispatch => {
    fetch(`${apiUrl}/api/insights`)
      .then(response => (response.json()))
      .then(data => {
        dispatch({
          type: INSIGHTS_LIST_RECEIVED,
          payload: { data }
        });
      })
      .catch(function(error) {
        dispatch({
          type: INSIGHTS_FETCH_ERROR,
          payload: error
        });
      });
  };
}

export function getInsightBySlug(slug) {
  return dispatch => {
    fetch(`${apiUrl}/api/insights/${slug}`)
      .then(response => (response.json()))
      .then(data => {
        dispatch({
          type: INSIGHTS_DETAIL_RECEIVED,
          payload: { data }
        });
      })
      .catch(function(error) {
        dispatch({
          type: INSIGHTS_FETCH_ERROR,
          payload: error
        });
      });
  };
}
