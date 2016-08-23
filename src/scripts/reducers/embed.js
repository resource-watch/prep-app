import { WIDGET_DETAIL_RECEIVED } from '../constants';

export default function (state = {}, action) {
  switch (action.type) {
    case WIDGET_DETAIL_RECEIVED: {
      const obj = {};
      obj[action.payload.data.slug] = action.payload.data;
      return Object.assign({}, state, obj);
    }
    default:
      return state;
  }
}
