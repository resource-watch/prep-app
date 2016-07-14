import {
  LIST_DASHBOARD_RECEIVED,
  DETAIL_DASHBOARD_RECEIVED
} from '../constants';

export function getDashboardList() {
  return dispatch => {
    fetch('/api/dashboards')
      .then(response => (response.json()))
      .then(data => {
        dispatch({
          type: LIST_DASHBOARD_RECEIVED,
          payload: { data }
        });
      }
    );
  };
}
export function getDashboardBySlug(slug) {
  return dispatch => {
    fetch(`/api/dashboards/${slug}`)
      .then(response => (response.json()))
      .then(data => {
        dispatch({
          type: DETAIL_DASHBOARD_RECEIVED,
          payload: { data }
        });
      }
    );
  };
}
