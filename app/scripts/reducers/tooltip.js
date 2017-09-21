import {
  SET_TOOLTIP,
  TOOLTIP_TOGGLE,
  TOOLTIP_SET_CHILDREN,
  TOOLTIP_LOADING,
  TOOLTIP_SET_CHILDREN_PROPS,
  TOOLTIP_SET_POSITION,
  TOOLTIP_FOLLOW_TOGGLE,
  TOOLTIP_DIRECTION
} from '../constants';

const initialState = {
  hidden: true,
  text: 'Tooltip Text Missing',
  position: {
    top: 0,
    left: 0
  },
  width: 'auto',
  // Re used
  opened: false,
  children: null,
  loading: false,
  follow: false,
  direction: 'top',
  childrenProps: {},
  pos: {
    x: 0,
    y: 0
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TOOLTIP:
      return Object.assign({}, state, action.payload);
    case TOOLTIP_TOGGLE:
      return Object.assign({}, state, { opened: action.payload });
    case TOOLTIP_SET_CHILDREN:
      return Object.assign({}, state, { children: action.payload });
    case TOOLTIP_LOADING:
      return Object.assign({}, state, { loading: action.payload });
    case TOOLTIP_SET_CHILDREN_PROPS:
      return Object.assign({}, state, { childrenProps: action.payload });
    case TOOLTIP_SET_POSITION:
      return Object.assign({}, state, { pos: { x: action.payload.x, y: action.payload.y } });
    case TOOLTIP_FOLLOW_TOGGLE:
      return Object.assign({}, state, { follow: action.payload });
    case TOOLTIP_DIRECTION:
      return Object.assign({}, state, { direction: action.payload });
    default:
      return state;
  }
}
