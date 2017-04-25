import 'whatwg-fetch';
import { TWITTER_FEED_LIST_RECEIVED, TWITTER_FEED_FETCH_ERROR } from '../constants';

export function getTwitterFeed() {
  return (dispatch) => {
    fetch('/api/twitter')
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        if (!data.error) {
          dispatch({
            type: TWITTER_FEED_LIST_RECEIVED,
            payload: { data: data.statuses }
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: TWITTER_FEED_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}
