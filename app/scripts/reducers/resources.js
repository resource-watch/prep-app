import {
  RESOURCES_LIST_RECEIVED
} from '../constants';

const initialState = {
  list: []
};

export default function resources(state = initialState, action) {
  switch (action.type) {
    case RESOURCES_LIST_RECEIVED: {
      return Object.assign({}, state, { list: action.payload.data });
    }
    default:
      return state;
  }
}
