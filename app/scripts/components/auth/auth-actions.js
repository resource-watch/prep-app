import { createAction } from 'redux-actions';

export const logInSuccess = createAction('logInSuccess');
export const logOutSuccess = createAction('logOutSuccess');

export default {
  logInSuccess,
  logOutSuccess
};
