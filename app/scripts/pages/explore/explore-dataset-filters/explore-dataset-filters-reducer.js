export const initialState = {
  data: {},
  originalData: {},
  filters: {},
  graphs: [] // array of dataset ID matching the graph criteria
};

export const setDataFilters = (state, { payload }) => {
  return ({
    ...state,
    datasetFilters: {
      ...state.datasetFilters,
      data: Object.assign({}, payload),
      originalData: Object.assign({}, payload)
    }
  });
};

export const updateDataFilters = (state, { payload }) => ({
  ...state,
  datasetFilters: {
    ...state.datasetFilters,
    data: { ...payload },
    originalData: { ...payload }
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

export const clearFilters = state => ({
  ...state,
  datasetFilters: {
    ...state.datasetFilters,
    data: state.datasetFilters.originalData,
    filters: initialState.filters,
    graphs: initialState.graphs
  }
});

export default {
  setDataFilters,
  updateDataFilters,
  setDatasetFilter,
  setGraphFilter,
  clearFilters
};
