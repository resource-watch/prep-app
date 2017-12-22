import { createAction, createThunkAction } from 'redux-tools';

import { updateURL } from 'actions/links';

export const setLocation = createAction('datasets/setLocation');
export const onChangeLocation = createThunkAction('datasets/onChangeLocation', () =>
  (dispatch) => {
    // dispatch(updateURL());
  }
);
