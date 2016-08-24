import { TWITTER_FEED_LIST_RECEIVED } from '../constants';

const initialState = {
  list: []
};

export default function twitterFeed(state = initialState, action) {
  switch (action.type) {
    case TWITTER_FEED_LIST_RECEIVED: {
      return Object.assign({}, state, { list: action.payload.data });
    }
    default:
      return state;
  }
}
