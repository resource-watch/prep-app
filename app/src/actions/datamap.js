import {
  MAP_DATA_CHANGED,
  SWITCH_CHANGED,
  SET_SWITCH_STATUS
} from '../constants';
import { push } from 'react-router-redux';

export function updateMapData(params, nextParams) {
  return dispatch => {
    dispatch(updateURLParams(params,nextParams));
    dispatch(updateMapParams(nextParams));
  }
}

export function updateURLParams(params, nextParams) {
  params = Object.assign({}, params, nextParams);

  let url = `${params.latLng.lat}/${params.latLng.lng}/${params.zoom}`;

  return push(`/data/map/${url}`);
};

export function updateMapParams(nextParams) {
  return {
    type: MAP_DATA_CHANGED,
    payload: nextParams
  }
};

export function switchChange(id) {
  return {
    type: SWITCH_CHANGED,
    payload: { id }
  };
}

export function setSwitchStatus(id, status) {
  return {
    type: SET_SWITCH_STATUS,
    payload: { id, status }
  };
}
