import { createAction } from 'redux-actions';

export const toggleActive = createAction('toggleActive');
export const updateUserData = createAction('updateUserData');

export default {
  toggleActive,
  updateUserData
};
