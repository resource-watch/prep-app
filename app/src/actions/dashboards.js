import 'whatwg-fetch';
import {
  DASHBOARD_FETCH_ERROR,
  DASHBOARD_LIST_RECEIVED,
  DASHBOARD_DETAIL_RECEIVED
} from '../constants';

export function getDashboardList() {
  return dispatch => {
    fetch(`${config.apiUrl}/api/dashboards`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
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
  return dispatch => {
    fetch(`${config.apiUrl}/api/dashboards/${slug}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
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
