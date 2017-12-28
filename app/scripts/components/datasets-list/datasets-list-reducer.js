import {
  FETCH_DATASETS_REQUEST,
  FETCH_DATASETS_FAILURE,
  FETCH_DATASETS_SUCCESS,
  TOGGLE_DATASET_LAYER,
  TOGGLE_DATASET_INFO
} from './datasets-list-constants';

const initialState = {
  items: [],
  isFetching: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_DATASETS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });

    case FETCH_DATASETS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        status: 'error',
        message: action.payload
      });

    case FETCH_DATASETS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        status: 'success',
        items: action.payload
      });

    case TOGGLE_DATASET_LAYER:
      return Object.assign({}, state, {
        items: state.items.map(item => (item.id === action.payload.id ?
          Object.assign({}, item, { isLayerActive: !item.isLayerActive }) : item))
      });
    
    case TOGGLE_DATASET_INFO:
      return Object.assign({}, state, {
        items: state.items.map(item => (item.id === action.payload.id ?
          Object.assign({}, item, { isSelected: !item.isSelected }) : 
          Object.assign({}, item, { isSelected: false })))
      });

    default:
      return state;
  }
}
