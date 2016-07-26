import {
  MAP_DATA_CHANGED,
  TOGGLE_LAYER_STATUS,
  SET_LAYER_STATUS
} from '../constants';
import { push } from 'react-router-redux';

export function updateURL() {
  return (dispatch, state) => {
    const params = state().datamap;
    const activeLayers = state().datasets.list.filter(layer => layer.active);

    const url = `${params.latLng.lat}/${params.latLng.lng}/${params.zoom}`;
    let query = '';
    if (activeLayers.length) {
      query = '?activeLayers=';

      activeLayers.forEach((layer, index) => {
        if (index > 0) query += ',';
        query += layer.slug;
      });
    }

    dispatch(push(`/data/map/${url}${query}`));
  };
}

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
