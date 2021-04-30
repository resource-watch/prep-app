import 'whatwg-fetch';
import {
  INSIGHTS_FETCH_ERROR,
  INSIGHTS_LIST_RECEIVED,
  INSIGHTS_DETAIL_RECEIVED,
  INSIGHTS_SEARCH_TERM,
} from '../constants';

export default function () {}

export function getInsightsList() {
  return (dispatch) => {
    fetch(`${config.apiUrl}/insights?env=${config.datasetEnv}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: INSIGHTS_LIST_RECEIVED,
          payload: { data }
        });
      })
      .catch((err) => {
        dispatch({
          type: INSIGHTS_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}

export function getInsightBySlug(slug) {
  return (dispatch) => {
    fetch(`${config.apiUrl}/insights/${slug}?env=${config.datasetEnv}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: INSIGHTS_DETAIL_RECEIVED,
          payload: { data }
        });
      })
      .catch((err) => {
        dispatch({
          type: INSIGHTS_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}


export function setSearchTerm(payload) {
  return {
    type: INSIGHTS_SEARCH_TERM,
    payload,
  };
}
