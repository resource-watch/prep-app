import {
  SWITCH_CHANGED,
  SET_SWITCH_STATUS
} from '../constants';
import { push } from 'react-router-redux';

export function updateURLParams(params, nextParams) {
  params = Object.assign({}, params, nextParams);

  let url = `${params.lat}/${params.lng}/${params.zoom}`;

  return push(`/data/map/${url}`);
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
