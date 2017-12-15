import { createAction } from 'redux-tools';

export const logInSuccess = createAction('logInSuccess');
export const logOutSuccess = createAction('logOutSuccess');

export default {
  logInSuccess,
  logOutSuccess
};
