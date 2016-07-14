import {
  INSIGHTS_LIST_RECEIVED,
  INSIGHTS_DETAIL_RECEIVED
} from '../constants';

const initialState = {
  list: [],
  detail: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INSIGHTS_LIST_RECEIVED: {
      return Object.assign({}, state, { list: action.payload.data });
    }
    case INSIGHTS_DETAIL_RECEIVED: {
      const obj = {};
      obj[action.payload.data.slug] = action.payload.data;
      return Object.assign({}, state, { detail: obj });
    }
    default:
      return state;
  }
}
