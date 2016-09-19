import {
  MAP_DATA_CHANGED,
  MAP_DATASET_ID_SELECTED,
  MAP_DESELECT_DATASET,
  MAP_GEOPOSITION_SET,
  MAP_GEODATA_RECEIVED,
  MAP_INTERACTION_VISIBILITY_SET
} from '../constants';

const initialState = {
  zoom: null,
  latLng: {
    lat: null,
    lng: null
  },
  zoomPosition: 'topright',
  basemap: config.basemapTileUrl || 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
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
      interactionData.open = true;
      interactionData.info = action.payload;
      return Object.assign({}, state, { interactionData });
    }
    default:
      return state;
  }
}
