import 'whatwg-fetch';
import {
  DASHBOARD_FETCH_ERROR,
  DASHBOARD_LIST_RECEIVED,
  DASHBOARD_DETAIL_RECEIVED,
  DASHBOARD_TOPICS_FILTER,
  DASHBOARD_GEOGRAPHIES_FILTER,
  DASHBOARD_SEARCH_TERM
} from '../constants';

export default function () {}

export function getDashboardList() {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_URL}/dashboards?env=${process.env.REACT_APP_DATASET_ENV}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: DASHBOARD_LIST_RECEIVED,
          payload: { data }
        });
      })
      .catch((err) => {
        dispatch({
          type: DASHBOARD_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}

export function getDashboardBySlug(slug) {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_URL}/dashboards/${slug}?env=${process.env.REACT_APP_DATASET_ENV}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: DASHBOARD_DETAIL_RECEIVED,
          payload: { data }
        });
      })
      .catch((err) => {
        dispatch({
          type: DASHBOARD_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}

export function setTopicsFilter(selected) {
  return {
    type: DASHBOARD_TOPICS_FILTER,
    payload: selected
  };
}

export function setGeographiesFilter(selected) {
  return {
    type: DASHBOARD_GEOGRAPHIES_FILTER,
    payload: selected
  };
}

export function setSearchTerm(payload) {
  return {
    type: DASHBOARD_SEARCH_TERM,
    payload,
  };
}
