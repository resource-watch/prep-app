import * as actions from './dataset-filter-actions';

export const initialState = {
  visibility: false,
  currentFilter: null,
  filtersChoosen: {},
  filtersConfig: {}
};

export default {
  [actions.setVisibility]: (state, { payload }) => ({ ...state, visibility: payload }),
  [actions.setCurrentFilter]: (state, { payload }) => ({ ...state, currentFilter: payload })
};
