import {
  SET_TOOLTIP
} from '../constants';

const initialState = {
  hidden: true,
  text: 'Tooltip Text Missing',
  position: {
    top: 0,
    left: 0
  },
  width: 'auto'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOOLTIP:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
