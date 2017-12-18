import { createAction, createThunkAction } from 'redux-tools';

import { updateURL } from 'actions/links';

export const setLocation = createAction('datasets/setLocation');
export const setDatasetsLocation = createThunkAction('datasets/onSetDatasetsLocation', location =>
  (dispatch) => {
    dispatch(setLocation(location));
    dispatch(updateURL());
  }
);
