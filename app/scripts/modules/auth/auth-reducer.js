import * as actions from './auth-actions';

export default {
  [actions.logInSuccess]: (state, { payload }) => ({ ...state, session: payload }),
  [actions.logOutSuccess]: (state, { payload }) => ({ ...state, session: payload })
};
