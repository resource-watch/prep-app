import {
  DASHBOARD_LIST_RECEIVED,
  DASHBOARD_DETAIL_RECEIVED,
  DASHBOARD_TOPICS_FILTER,
  DASHBOARD_GEOGRAPHIES_FILTER
} from '../constants';

const initialState = {
  listLoaded: false,
  list: [],
  detail: {},
  // Dashboard filters below
  topics: [],
  geographies: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DASHBOARD_LIST_RECEIVED: {
      return Object.assign({}, state, {
        list: action.payload.data,
        listLoaded: true
      });
    }

    case DASHBOARD_DETAIL_RECEIVED: {
      const obj = {};
      obj[action.payload.data.slug] = action.payload.data;
      return Object.assign({}, state, { detail: obj });
    }

    case DASHBOARD_TOPICS_FILTER: {
      return Object.assign({}, state, { topics: action.payload });
    }

    case DASHBOARD_GEOGRAPHIES_FILTER: {
      return Object.assign({}, state, { geographies: action.payload });
    }

    default:
      return state;
  }
}
