export const fetchCoreDatasets = state => ({
  ...state,
  coreDatasets: { ...state.coreDatasets, isFetching: true }
});

export const receiveCoreDatasets = (state, { payload }) => ({
  ...state,
  coreDatasets: {
    ...state.coreDatasets,
    isFetching: false,
    status: 'success',
    items: payload
  }
});

export const failureCoreDatasets = (state, { payload }) => ({
  ...state,
  coreDatasets: { ...state.coreDatasets, isFetching: false, status: 'error', message: payload }
});
