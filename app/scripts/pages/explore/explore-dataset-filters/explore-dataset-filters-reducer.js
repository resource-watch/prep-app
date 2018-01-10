export const initialState = {
  data: {},
  filters: {},
  graphs: [] // array of dataset ID matching the graph criteria
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

export const setGraphFilter = (state, { payload }) => ({
  ...state,
  datasetFilters: {
    ...state.datasetFilters,
    graphs: payload
  }
});

export default {
  setDataFilters,
  setDatasetFilter,
  setGraphFilter
};
