import { basemaps } from './basemap-control-constants';
import * as actions from './basemap-control-actions';

const getBasemap = basemapKey => basemaps[basemapKey];

export default {
  [actions.setBasemap]: (state, { payload }) => ({ ...state, basemap: getBasemap(payload) })
};
