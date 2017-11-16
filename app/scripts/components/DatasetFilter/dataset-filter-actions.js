import { createAction } from 'redux-actions';
import { createThunkAction } from 'utils/redux';

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
