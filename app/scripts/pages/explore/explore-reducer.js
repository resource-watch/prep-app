import {
  SET_TAB
} from './explore-constants';

const initialState = {
  tab: 'core_datasets',
  basemap: 'default'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TAB: {
      return Object.assign({}, state, {
        tab: action.payload
      });
    }
    default:
      return state;
  }
}
