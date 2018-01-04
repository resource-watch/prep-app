export const setBasemap = (state, { payload }) => ({
  ...state,
  map: {
    ...state.map,
    basemap: payload
  }
});

export const setLabels = (state, { payload }) => ({
  ...state,
  map: {
    ...state.map,
    labels: payload
  }
});

export const setBoundaries = (state, { payload }) => ({
  ...state,
  map: {
    ...state.map,
    boundaries: payload
  }
});

export const setMapParams = (state, { payload }) => ({
  ...state,
  map: {
    ...state.map,
    zoom: payload.zoom,
    lat: payload.lat,
    lng: payload.lng
  }
});
