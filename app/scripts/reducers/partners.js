import { PARTNERS_LIST_RECEIVED } from '../constants';

const initialState = {
  list: []
};

export default function partners(state = initialState, action) {
  switch (action.type) {
    case PARTNERS_LIST_RECEIVED: {
      return Object.assign({}, state, { list: action.payload.data });
    }
    default:
      return state;
  }
}
