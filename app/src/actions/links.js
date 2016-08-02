import 'whatwg-fetch';
import { LINK_SHORTEN_RECEIVE, LINK_SHORTEN_ERROR } from '../constants';

export function getShortLink(longUrl) {
  return dispatch => {
    const url = encodeURIComponent(longUrl);
    fetch(`/short?url=${url}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        dispatch({
          type: LINK_SHORTEN_RECEIVE,
          payload: {
            shortUrl: data.data.url,
            longUrl
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: LINK_SHORTEN_ERROR,
          payload: {
            error: err.message,
            longUrl
          }
        });
      });
  };
}
