export const setLocation = (state, { payload }) => ({
  ...state,
  coreDatasets: {
    ...state.coreDatasets,
    location: payload
  }
});

export default { setLocation };
