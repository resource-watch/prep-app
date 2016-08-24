import {
  MAP_DATA_CHANGED,
  TOGGLE_LAYER_STATUS,
  SET_LAYER_STATUS
} from '../constants';

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
