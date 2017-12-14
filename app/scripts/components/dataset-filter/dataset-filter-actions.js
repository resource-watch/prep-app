import { createAction, createThunkAction } from 'redux-tools';

import { setDatasetsTagFilter } from 'actions/datasets';
import { updateURL } from 'actions/links';

export const setVisibility = createAction('setVisibility');
export const setCurrentFilter = createAction('setCurrentFilter');

export const setDatasetFilter = createThunkAction('setDatasetFilter', (filter, tag) =>
  (dispatch) => {
    dispatch(setDatasetsTagFilter(filter, tag));
    dispatch(updateURL());
  }
);
