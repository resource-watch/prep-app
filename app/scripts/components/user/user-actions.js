import { createAction } from 'redux-tools';

export const toggleActive = createAction('toggleActive');
export const updateUserData = createAction('updateUserData');

export default {
  toggleActive,
  updateUserData
};
