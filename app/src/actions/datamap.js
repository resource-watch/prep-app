import {
  MAP_DATA_CHANGED,
  DATASET_LIST_UPDATED,
  SET_SWITCH_STATUS
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

export function switchChange(slug) {
  return (dispatch, state) => {
    const list = state().datasets.list.slice(0);
    for (let i = 0, length = list.length; i < length; i++) {
      if (list[i].slug === slug) {
        list[i].active = !list[i].active;
        break;
      }
    }
    dispatch({
      type: DATASET_LIST_UPDATED,
      payload: list
    });
  };
}

export function setSwitchStatus(id, status) {
  return {
    type: SET_SWITCH_STATUS,
    payload: { id, status }
  };
}
