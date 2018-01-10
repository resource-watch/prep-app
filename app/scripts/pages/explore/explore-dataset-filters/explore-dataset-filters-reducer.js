export const initialState = {
  data: {},
  filters: {}
};

export const setDataFilters = (state, { payload }) => ({
  ...state,
  datasetFilters: {
    ...state.datasetFilters,
    data: payload
  }
});
export const setDatasetFilter = (state, { payload }) => ({
  ...state,
  datasetFilters: {
    ...state.datasetFilters,
    filters: { ...state.datasetFilters.filters, ...payload }
  }
});

export default {
  setDataFilters,
  setDatasetFilter
};
