import 'whatwg-fetch';
import {
  INSIGHTS_FETCH_ERROR,
  INSIGHTS_LIST_RECEIVED,
  INSIGHTS_DETAIL_RECEIVED,
  INSIGHTS_SEARCH_TERM,
} from '../constants';

export function getInsightsList() {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_URL}/insights?env=${process.env.REACT_APP_DATASET_ENV}`)
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
    fetch(`${process.env.REACT_APP_API_URL}/insights/${slug}?env=${process.env.REACT_APP_DATASET_ENV}`)
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
