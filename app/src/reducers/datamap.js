import {
  MAP_ZOOM_CHANGED
} from '../constants';

const initialState = {
  zoom: 3,
  maxZoom: 18,
  latLng:{
    lat: 48.46038,
    lng: -123.889823
  },
  zoomPosition: 'topright',
  basemap: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
  activeLayers: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MAP_ZOOM_CHANGED: {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
}
