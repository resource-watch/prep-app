import * as actions from './auth-actions';

export const initialState = {
  session: !!sessionStorage.getItem('token')
};

export default {
  [actions.logInSuccess]: (state, { payload }) => ({ ...state, session: payload }),
  [actions.logOutSuccess]: (state, { payload }) => ({ ...state, session: payload })
};