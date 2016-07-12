import { SET_MODAL_UNDER_DEVELOP } from '../constants';

const initialState = {
  open: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_UNDER_DEVELOP:
      return Object.assign({}, state, { open: action.payload });
    default:
      return state;
  }
}
