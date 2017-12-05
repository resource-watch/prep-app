import {
  NEXGDDP_SET_MAP_ZOOM,
  NEXGDDP_SET_MAP_CENTER,
  NEXGDDP_SET_MARKER_POSITION,
  NEXGDDP_SET_MAP_MODE,
  NEXGDDP_SET_GRAPH_MODE,
  NEXGDDP_SET_SCENARIO_OPTIONS,
  NEXGDDP_SET_SCENARIO_SELECTION,
  NEXGDDP_SET_RANGE1_OPTIONS,
  NEXGDDP_SET_RANGE1_SELECTION,
  NEXGDDP_SET_RANGE2_OPTIONS,
  NEXGDDP_SET_RANGE2_SELECTION
} from '../constants';

export function setMapZoom(zoom) {
  return {
    type: NEXGDDP_SET_MAP_ZOOM,
    payload: zoom
  };
}

export function setMapCenter(center) {
  return {
    type: NEXGDDP_SET_MAP_CENTER,
    payload: center
  };
}

export function setMarkerPosition(coordinates) {
  return {
    type: NEXGDDP_SET_MARKER_POSITION,
    payload: coordinates
  };
}

export function setMapMode(mapMode) {
  return {
    type: NEXGDDP_SET_MAP_MODE,
    payload: mapMode
  };
}

export function setGraphMode(graphMode) {
  return {
    type: NEXGDDP_SET_GRAPH_MODE,
    payload: graphMode
  };
}

export function setScenarioOptions(options) {
  return {
    type: NEXGDDP_SET_SCENARIO_OPTIONS,
    payload: options
  };
}

export function setScenarioSelection(selection) {
  return {
    type: NEXGDDP_SET_SCENARIO_SELECTION,
    payload: selection
  };
}

export function setRange1Options(options) {
  return {
    type: NEXGDDP_SET_RANGE1_OPTIONS,
    payload: options
  };
}

export function setRange1Selection(selection) {
  return {
    type: NEXGDDP_SET_RANGE1_SELECTION,
    payload: selection
  };
}

export function setRange2Options(options) {
  return {
    type: NEXGDDP_SET_RANGE2_OPTIONS,
    payload: options
  };
}

export function setRange2Selection(selection) {
  return {
    type: NEXGDDP_SET_RANGE2_SELECTION,
    payload: selection
  };
}
