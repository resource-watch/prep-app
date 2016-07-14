import {
  DASHBOARD_FETCH_ERROR,
  DASHBOARD_LIST_RECEIVED,
  DASHBOARD_DETAIL_RECEIVED
} from '../constants';

export function getDashboardList() {
  return dispatch => {
    fetch('http://localhost:9000/api/dashboards')
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(data => {
        dispatch({
          type: DASHBOARD_LIST_RECEIVED,
          payload: { data }
        });
      })
      .catch(function(error) {
        dispatch({
          type: DASHBOARD_FETCH_ERROR,
          payload: error
        });
      });
  };
}
export function getDashboardBySlug(slug) {
  return dispatch => {
    fetch(`http://localhost:9000/api/dashboards/${slug}`)
      .then(response => {
        if (response.ok) return response.json();
      })
      .then(data => {
        dispatch({
          type: DASHBOARD_DETAIL_RECEIVED,
          payload: { data }
        });
      })
      .catch(function(error) {
        dispatch({
          type: DASHBOARD_FETCH_ERROR,
          payload: error
        });
      });
  };
}
