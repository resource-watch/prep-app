import {
  MAP_DATA_CHANGED,
  TOGGLE_LAYER_STATUS,
  SET_LAYER_STATUS,
  MAP_LAYERS_ORDER_CHANGED,
  MAP_LAYER_OPACITY_CHANGED
} from '../constants';

import { updateURL } from './links';

export function updateMapParams(params) {
  return {
    type: MAP_DATA_CHANGED,
    payload: params
  };
}

export function switchChange(id) {
  return {
    type: TOGGLE_LAYER_STATUS,
    payload: id
  };
}

export function setSwitchStatus(id, status) {
  return {
    type: SET_LAYER_STATUS,
    payload: { id, status }
  };
}

export function setLayersOrder(layers) {
  return dispatch => {
    dispatch({
      type: MAP_LAYERS_ORDER_CHANGED,
      payload: layers
    });
    dispatch(updateURL());
  };
}

export function toggleLayerOpacity(layerId) {
  return {
    type: MAP_LAYER_OPACITY_CHANGED,
    payload: layerId
  };
}
