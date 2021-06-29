import {
  DASHBOARD_LIST_RECEIVED,
  DASHBOARD_DETAIL_RECEIVED,
  DASHBOARD_TOPICS_FILTER,
  DASHBOARD_GEOGRAPHIES_FILTER,
  DASHBOARD_SEARCH_TERM
} from '../constants';

const initialState = {
  listLoaded: false,
  list: [],
  detail: {},
  // Dashboard filters below
  topics: [],
  geographies: [],
  searchTerm: null,
};

export default function DashboardsReducer(state = initialState, action) {
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

    case DASHBOARD_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.payload,
      };
    }

    default:
      return state;
  }
}
