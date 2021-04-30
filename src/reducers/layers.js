import { LAYER_DATA_RECEIVED } from '../constants';

export default function (state = {}, action) {
  switch (action.type) {
    case LAYER_DATA_RECEIVED: {
      const layers = Object.assign({}, state.layers, {});
      layers[action.payload.data.id] = action.payload.data;
      return Object.assign({}, state, layers);
    }
    default:
      return state;
  }
}
