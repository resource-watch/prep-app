import * as actions from './user-actions';

export const initialState = {
  active: false,
  data: {}
};

export default {
  [actions.toggleActive]: (state, { payload }) => ({ ...state, active: payload }),
  [actions.updateUserData]: (state, { payload }) => ({ ...state, data: payload })
};
