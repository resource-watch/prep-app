import {
  SET_TAB,
  SET_BASEMAP,
  SET_LABELS,
  SET_BOUNDARIES,
  BASEMAPS,
  LABELS,
  BOUNDARIES
} from './explore-constants';

const initialState = {
  zoom: null,
  lat: null,
  lng: null,
  basemap: BASEMAPS.default,
  labels: LABELS.light,
  boundaries: BOUNDARIES.dark,
  tab: 'core_datasets'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_TAB: {
      return Object.assign({}, state, {
        tab: action.payload
      });
    }
    case SET_BASEMAP: {
      return Object.assign({}, state, {
        basemap: action.payload
      });
    }
    case SET_LABELS: {
      return Object.assign({}, state, {
        labels: action.payload
      });
    }
    case SET_BOUNDARIES: {
      return Object.assign({}, state, {
        boundaries: action.payload
      });
    }
    default:
      return state;
  }
}
