import 'whatwg-fetch';
import {
  WIDGET_FETCH_ERROR,
  WIDGET_DETAIL_RECEIVED
} from '../constants';


export function getWidgetBySlug(slug) {
  return dispatch => {
    fetch(`${config.apiUrl}/api/widgets/${slug}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        dispatch({
          type: WIDGET_DETAIL_RECEIVED,
          payload: { data }
        });
      })
      .catch((err) => {
        dispatch({
          type: WIDGET_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}
