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

export const setWater = (state, { payload }) => ({
  ...state,
  map: {
    ...state.map,
    water: payload
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

export const setBBox = (state, { payload }) => {
  let bbox = payload;

  // Transforming L.bounds to array
  if (bbox instanceof L.LatLngBounds) {
    bbox = bbox.toBBoxString().split(',').map(n => Number(n));
  }

  return {
    ...state,
    map: {
      ...state.map,
      bbox
    }
  };
};
