import {
  MAP_DATA_CHANGED
} from '../constants';

const initialState = {
  zoom: null,
  latLng: {
    lat: null,
    lng: null
  },
  zoomPosition: 'topright',
  basemap: 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
  basemapOptions: { maxZoom: 18, opacity: 0.5 }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MAP_DATA_CHANGED: {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
}
