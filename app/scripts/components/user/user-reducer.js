import * as actions from './user-actions';

export default {
  [actions.toggleActive]: (state, { payload }) => ({ ...state, active: payload }),
  [actions.updateUserData]: (state, { payload }) => ({ ...state, data: payload })
};
