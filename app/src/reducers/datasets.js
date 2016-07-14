import {
  DATASET_LIST_RECEIVED,
  DATASET_DETAIL_RECEIVED,
  SWITCH_CHANGED,
  SET_SWITCH_STATUS
} from '../constants';

const initialState = {
  list: [],
  detail: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATASET_LIST_RECEIVED: {
      return Object.assign({}, state, { list: action.payload.data });
    }
    case DATASET_DETAIL_RECEIVED: {
      const obj = {};
      obj[action.payload.data.slug] = action.payload.data;
      return Object.assign({}, state, { detail: obj });
    }
    case SWITCH_CHANGED: {
      const list = state.list.slice(0);
      for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].id === action.payload.id) {
          list[i].active = !list[i].active;
          break;
        }
      }
      return Object.assign({}, state, { list });
    }
    case SET_SWITCH_STATUS: {
      const list = state.list.slice(0);
      for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].id === action.payload.id) {
          list[i].active = action.payload.status;
          break;
        }
      }
      return Object.assign({}, state, { list });
    }
    default:
      return state;
  }
}
