import {
  SET_TAB,
  SET_BASEMAP,
  SET_LABELS,
  SET_BOUNDARIES
} from './explore-constants';

export function setTab(tab) {
  return {
    type: SET_TAB,
    payload: tab
  };
}

export function setBasemap(basemap) {
  return {
    type: SET_BASEMAP,
    payload: basemap
  };
}

export function setLabels(labelEnabled) {
  return {
    type: SET_LABELS,
    payload: labelEnabled
  };
}

export function setBoundaries(boundariesEnabled) {
  return {
    type: SET_BOUNDARIES,
    payload: boundariesEnabled
  };
}
