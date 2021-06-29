import 'whatwg-fetch';
import {
  WIDGET_FETCH_ERROR,
  WIDGET_DETAIL_RECEIVED
} from '../constants';

export function getWidgetBySlug(slug) {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_URL}/widgets/${slug}?cache=false`, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
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
