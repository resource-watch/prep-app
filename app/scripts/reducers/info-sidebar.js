import {
  SET_INFO_SIDEBAR_METADATA
} from '../constants';

const initialState = {
  metadata: {
    datasetSlug: null,
    open: false
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_INFO_SIDEBAR_METADATA:
      return Object.assign({}, state, { metadata: action.payload });
    default:
      return state;
  }
}
