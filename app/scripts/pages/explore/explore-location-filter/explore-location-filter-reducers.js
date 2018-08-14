export const setLocation = (state, { payload }) => ({
  ...state,
  coreDatasets: {
    ...state.coreDatasets,
    location: payload.toUpperCase()
  }
});

export const fetchLocations = state => ({
  ...state,
  locations: { ...state.locations, isFetching: true }
});

export const receiveLocations = (state, { payload }) => ({
  ...state,
  locations: {
    ...state.locations,
    isFetching: false,
    status: 'success',
    items: payload
  }
});

export const failureLocations = (state, { payload }) => ({
  ...state,
  locations: { ...state.locations, isFetching: false, status: 'error', message: payload }
});

export default { setLocation, fetchLocations, receiveLocations, failureLocations };
