import {
  DATASET_LIST_RECEIVED,
  DATASET_LIST_RESET,
  DATASET_DETAIL_RECEIVED,
  DATASET_WIDGET_RECEIVED,
  DATASET_LAYER_RECEIVED,
  DATASET_METADATA_RECEIVED,
  TOGGLE_LAYER_STATUS,
  SET_LAYER_STATUS,
  DATASET_LAYER_FETCH_ERROR,
  DATASET_SET_FILTER,
  MAP_LAYERS_ORDER_CHANGED,
  MAP_LAYER_OPACITY_CHANGED,
  SET_LAYERGROUP_ACTIVE_LAYER,
  CHANGE_TAB
} from '../constants';

const initialState = {
  list: [],
  filteredList: [],
  details: {},
  widgets: {},
  layers: {},
  metadatas: {},
  filters: {
    geography: ['global', 'national']
  },
  tab: 'core_datasets'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DATASET_LIST_RECEIVED: {
      return Object.assign({}, state, { list: action.payload.data });
    }
    case DATASET_LIST_RESET: {
      return Object.assign({}, state, { list: [], filteredList: [] });
    }
    case DATASET_DETAIL_RECEIVED: {
      const details = Object.assign({}, state.details, {});
      details[action.payload.data.id] = action.payload.data;
      return Object.assign({}, state, { details });
    }
    case DATASET_WIDGET_RECEIVED: {
      const widgets = Object.assign({}, state.widgets, {});
      if (!widgets[action.payload.data.attributes.dataset]) {
        widgets[action.payload.data.attributes.dataset] = [];
      }
      const newWidgets = widgets[action.payload.data.attributes.dataset].slice(0);
      newWidgets.push(action.payload.data);
      widgets[action.payload.data.attributes.dataset] = newWidgets;
      return Object.assign({}, state, { widgets });
    }
    case DATASET_LAYER_RECEIVED: {
      const layers = Object.assign({}, state.layers, {});
      layers[action.payload.id] = action.payload;
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
      const list = state.list.slice(0);
      let filteredList = [];
      const filtersChoosen = Object.assign({}, state.filters);

      if (action.payload.filter) {
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
      }

      if (list && list.length) {
        const andFilters = Object.keys(filtersChoosen);
        filteredList = list.filter((item) => {
          for (let i = andFilters.length - 1; i >= 0; i--) {
            const tags = filtersChoosen[andFilters[i]];
            let itemTags = [];
            if (item.vocabulary[0]) {
              itemTags = item.vocabulary[0].attributes.tags || [];
            }
            let j = tags.length - 1;
            for (j; j >= 0; j--) {
              if (itemTags.indexOf(tags[j]) > -1) {
                break;
              }
            }
            if (tags.length > 0 && j < 0) {
              if (item.active === true) {
                item.active = false; // eslint-disable-line no-param-reassign
              }
              return false;
            }
          }
          return true;
        });
      }

      return Object.assign({}, state, { filteredList, filters: filtersChoosen });
    }
    case TOGGLE_LAYER_STATUS: {
      const filteredList = state.filteredList.slice(0);
      const index = state.filteredList.map(d => d.id).indexOf(action.payload);

      if (index !== -1) {
        filteredList[index].active = !filteredList[index].active;
        filteredList[index].opacity = 1;
        if (filteredList[index].active) {
          filteredList[index].index = state.filteredList.filter(layer => layer.active).length;
        }
      }
      return Object.assign({}, state, { filteredList });
    }
    case SET_LAYER_STATUS: {
      const filteredList = state.filteredList.slice(0);
      for (let i = 0, length = filteredList.length; i < length; i++) {
        if (filteredList[i].id === action.payload.id) {
          filteredList[i].active = action.payload.status;
          break;
        }
      }
      return Object.assign({}, state, { filteredList });
    }
    case MAP_LAYERS_ORDER_CHANGED: {
      const datasets = state.filteredList.slice(0);
      const idsOrdered = action.payload.map(item => item.dataset);

      for (let i = 0, dsLength = datasets.length; i < dsLength; i++) {
        const index = idsOrdered.indexOf(datasets[i].id);
        if (index > -1) {
          datasets[i].index = index + 1;
        } else {
          datasets[i].index = 0;
        }
      }
      return Object.assign({}, state, { filteredList: datasets });
    }
    case MAP_LAYER_OPACITY_CHANGED: {
      const datasets = state.filteredList.slice(0);

      for (let i = 0, dsLength = datasets.length; i < dsLength; i++) {
        if (datasets[i].id === action.payload.id) {
          // datasets[i].opacity = datasets[i].opacity ? 0 : 1;
          datasets[i].opacity = action.payload.opacity !== undefined ? action.payload.opacity : 1;
          break;
        }
      }
      return Object.assign({}, state, { filteredList: datasets });
    }
    case SET_LAYERGROUP_ACTIVE_LAYER: {
      const newLayers = {};
      Object.keys(state.layers).forEach((key) => {
        const l = state.layers[key];

        if (l.dataset !== action.payload.dataset) newLayers[key] = l;
        else if (l.dataset === action.payload.dataset && key === action.payload.layer) {
          newLayers[key] = Object.assign({}, l, { active: true });
        } else newLayers[key] = Object.assign({}, l, { active: false });
      });
      return Object.assign({}, state, { layers: newLayers });
    }
    case CHANGE_TAB: {
      return Object.assign({}, state, { tab: action.payload });
    }
    default:
      return state;
  }
}
