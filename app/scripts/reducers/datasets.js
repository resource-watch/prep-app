import {
  DATASET_LIST_RECEIVED,
  DATASET_DETAIL_RECEIVED,
  DATASET_WIDGET_RECEIVED,
  DATASET_LAYER_RECEIVED,
  DATASET_METADATA_RECEIVED,
  TOGGLE_LAYER_STATUS,
  SET_LAYER_STATUS,
  DATASET_LAYER_FETCH_ERROR,
  DATASET_SET_FILTER
} from '../constants';

const initialState = {
  list: [],
  details: {},
  widgets: {},
  layers: {},
  metadatas: {},
  filters: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATASET_LIST_RECEIVED: {
      return Object.assign({}, state, { list: action.payload.data });
    }
    case DATASET_DETAIL_RECEIVED: {
      const details = Object.assign({}, state.details, {});
      details[action.payload.data.id] = action.payload.data;
      return Object.assign({}, state, { details });
    }
    case DATASET_WIDGET_RECEIVED: {
      const widgets = Object.assign({}, state.widgets, {});
      widgets[action.payload.data.attributes.datasetId] = action.payload.data;
      return Object.assign({}, state, { widgets });
    }
    case DATASET_LAYER_RECEIVED: {
      const layers = Object.assign({}, state.layers, {});
      layers[action.payload.data.id] = action.payload.data;
      return Object.assign({}, state, { layers });
    }
    case DATASET_METADATA_RECEIVED: {
      const metadatas = Object.assign({}, state.metadatas, {});
      metadatas[action.payload.attributes.dataset] = action.payload;
      return Object.assign({}, state, { metadatas });
    }
    case DATASET_LAYER_FETCH_ERROR: {
      const list = state.list.slice(0);
      for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].id === action.payload.id) {
          list[i].active = false;
          break;
        }
      }
      return Object.assign({}, state, { list });
    }
    case DATASET_SET_FILTER: {
      // update the filters object
      const list = state.list.slice(0);
      const filtersChoosen = Object.assign({}, state.filters);
      if (filtersChoosen[action.payload.filter]) {
        const index = filtersChoosen[action.payload.filter].indexOf(action.payload.tag);
        if (index > -1) {
          filtersChoosen[action.payload.filter].splice(index, 1);
        } else {
          filtersChoosen[action.payload.filter].push(action.payload.tag);
        }
      } else {
        filtersChoosen[action.payload.filter] = [action.payload.tag];
      }

      // deactivate a layer out of the filters
      let filtersFlatten = [];
      if (Object.keys(filtersChoosen).length > 0) {
        Object.keys(filtersChoosen).forEach((key) => {
          filtersFlatten = filtersFlatten.concat(filtersChoosen[key]);
        });
        if (filtersFlatten.length) {
          for (let i = list.length - 1; i >= 0; i--) {
            let isOutsideFilter = true;
            for (let j = filtersFlatten.length - 1; j >= 0; j--) {
              if (list[i].tags.indexOf(filtersFlatten[j]) > -1) {
                isOutsideFilter = false;
                break;
              }
            }
            if (isOutsideFilter && list[i].active === true) {
              list[i].active = false;
            }
          }
        }
      }
      return Object.assign({}, state, { list, filters: filtersChoosen });
    }
    case TOGGLE_LAYER_STATUS: {
      const list = state.list.slice(0);
      for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].id === action.payload) {
          list[i].active = !list[i].active;
          break;
        }
      }
      return Object.assign({}, state, { list });
    }
    case SET_LAYER_STATUS: {
      const list = state.list.slice(0);
      for (let i = 0, length = list.length; i < length; i++) {
        if (list[i].id === action.payload.id) {
          list[i].active = action.payload.status;
          break;
        }
      }
      return Object.assign({}, state, { list });
    }
    default:
      return state;
  }
}
