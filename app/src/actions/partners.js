import { PARTNERS_LIST_RECEIVED, PARTNERS_FETCH_ERROR } from '../constants';

export function getPartners() {
  return dispatch => {
    fetch(`${config.apiUrl}/api/partners`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        dispatch({
          type: PARTNERS_LIST_RECEIVED,
          payload: { data }
        });
      })
      .catch((err) => {
        dispatch({
          type: PARTNERS_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}
