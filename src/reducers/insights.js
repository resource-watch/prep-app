import {
  INSIGHTS_LIST_RECEIVED,
  INSIGHTS_DETAIL_RECEIVED,
  INSIGHTS_SEARCH_TERM,
} from '../constants';

const initialState = {
  list: [],
  detail: {},
  searchTerm: null,
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
    case INSIGHTS_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }
    default:
      return state;
  }
}
