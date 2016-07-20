import {

} from '../constants';

const initialState = {
  zoom: 3,
  zoomPosition: 'topright',
  maxZoom: 18,
  latLng: [48.46038, -123.889823],
  basemap: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
  activeLayers: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
