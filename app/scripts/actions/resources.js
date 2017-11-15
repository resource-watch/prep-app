import queryString from 'query-string';
import { RESOURCES_LIST_RECEIVED, RESOURCES_FETCH_ERROR } from '../constants';

export default function () {}

export function getResources(params) {
  const queryParams = Object.assign({ published: true }, params || {});
  return (dispatch) => {
    fetch(`${config.apiUrl}/resources?${queryString.stringify(queryParams)}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: RESOURCES_LIST_RECEIVED,
          payload: { data }
        });
      })
      .catch((err) => {
        dispatch({
          type: RESOURCES_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}
