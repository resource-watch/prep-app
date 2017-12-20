import { createAction, createThunkAction } from 'redux-tools';

import { setDatasetsTagFilter } from 'actions/datasets';
import { updateURL } from 'actions/links';

import DatasetFilterService from 'services/dataset-filter-service';

export const setDataFilters = createAction('explore-dataset-filters/setDataFilters');
export const setFilter = createAction('explore-dataset-filters/setFilter');

export const getFiltersData = createThunkAction('explore-dataset-filters/getFiltersData', () =>
  (dispatch) => {
    Promise.all([
      DatasetFilterService.getTopics(),
      DatasetFilterService.getGeographies(),
      DatasetFilterService.getDataTypes()
    ]
    ).then((values = []) => {
      const data = {};
      values.map(val => Object.assign(data, val));
      dispatch(setDataFilters(data));
    });
  }
);

export const onSetDatasetFilter = createThunkAction('explore-dataset-filters/onSetDatasetFilter', (filter, tag) =>
  (dispatch) => {
    dispatch(setDatasetsTagFilter(filter, tag));
    dispatch(updateURL());
  }
);
