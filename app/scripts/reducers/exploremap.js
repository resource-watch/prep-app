import {
  MAP_DATA_CHANGED,
  MAP_DATASET_ID_SELECTED,
  MAP_DESELECT_DATASET,
  MAP_GEOPOSITION_SET,
  MAP_GEODATA_RECEIVED,
  MAP_INTERACTION_VISIBILITY_SET,
  SET_BASEMAP,
  SET_LABELS
} from '../constants';

import { BASEMAPS } from '../general-constants/basemaps';


const initialState = {
  zoom: null,
  latLng: {
    lat: null,
    lng: null
  },
  zoomPosition: 'bottomright',
  basemap: BASEMAPS.default,
  basemapControl: {
    basemaps: BASEMAPS
  },
  labels: false,
  basemapOptions: { maxZoom: 18 },
  interactionData: {
    info: null,
    open: false,
    datasetId: null,
    position: {
      x: null,
      y: null
    }
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MAP_DATA_CHANGED: {
      return Object.assign({}, state, action.payload);
    }
    case MAP_DATASET_ID_SELECTED: {
      const interactionData = Object.assign({}, state.interactionData, {});
      interactionData.datasetId = action.payload;
      return Object.assign({}, state, { interactionData });
    }
    case MAP_DESELECT_DATASET: {
      const interactionData = Object.assign({}, state.interactionData, {});
      interactionData.datasetId = null;
      return Object.assign({}, state, { interactionData });
    }
    case MAP_GEOPOSITION_SET: {
      const interactionData = Object.assign({}, state.interactionData, {});
      interactionData.position = action.payload;
      return Object.assign({}, state, { interactionData });
    }
    case MAP_INTERACTION_VISIBILITY_SET: {
      const interactionData = Object.assign({}, state.interactionData, {});
      interactionData.open = action.payload;
      return Object.assign({}, state, { interactionData });
    }
    case MAP_GEODATA_RECEIVED: {
      const interactionData = Object.assign({}, state.interactionData, {});
      interactionData.info = action.payload;
      interactionData.open = true;
      return Object.assign({}, state, { interactionData });
    }
    case SET_BASEMAP: {
      return Object.assign({}, state, {
        basemap: action.payload
      });
    }
    case SET_LABELS: {
      return Object.assign({}, state, {
        labels: action.payload
      });
    }
    default:
      return state;
  }
}
