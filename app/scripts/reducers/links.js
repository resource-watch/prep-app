import { LINK_SHORTEN_RECEIVE, LINK_SHORTEN_ERROR } from '../constants';

export default function (state = { }, action) {
  switch (action.type) {
    case LINK_SHORTEN_RECEIVE: {
      const links = Object.assign({}, state, {});
      links[action.payload.longUrl] = action.payload.shortUrl;
      return Object.assign({}, state, links);
    }
    case LINK_SHORTEN_ERROR: {
      const links = Object.assign({}, state, {});
      links[action.payload.longUrl] = 'Error generating short url';
      return Object.assign({}, state, links);
    }
    default:
      return state;
  }
}
