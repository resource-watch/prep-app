import {
  DASHBOARD_FETCH_ERROR,
  DASHBOARD_LIST_RECEIVED,
  DASHBOARD_DETAIL_RECEIVED
} from '../constants';

const { apiUrl } = config;

export function getDashboardList() {
  return dispatch => {
    fetch(`${apiUrl}/api/dashboards`)
      .then(response => (response.json()))
      .then(data => {
        dispatch({
          type: DASHBOARD_LIST_RECEIVED,
          payload: { data }
        });
      })
      .catch((err) => {
        dispatch({
          type: DASHBOARD_FETCH_ERROR,
          payload: err
        });
      });
  };
}

export function getDashboardBySlug(slug) {
  return dispatch => {
    fetch(`${apiUrl}/api/dashboards/${slug}`)
      .then(response => (response.json()))
      .then(data => {
        dispatch({
          type: DASHBOARD_DETAIL_RECEIVED,
          payload: { data }
        });
      })
      .catch((err) => {
        dispatch({
          type: DASHBOARD_FETCH_ERROR,
          payload: err
        });
      });
  };
}
