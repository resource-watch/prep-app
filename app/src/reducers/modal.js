import { SET_MODAL_UNDER_DEVELOP, SET_MODAL_SHARE } from '../constants';

const initialState = {
  underDevelop: false,
  share: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_UNDER_DEVELOP:
      return Object.assign({}, state, { underDevelop: action.payload });
    case SET_MODAL_SHARE:
      return Object.assign({}, state, { share: action.payload });
    default:
      return state;
  }
}
