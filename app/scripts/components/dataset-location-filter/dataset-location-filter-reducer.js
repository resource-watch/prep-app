import * as actions from './dataset-location-filter-actions';

export const initialState = {
  location: 'global'
};

export default {
  [actions.setLocation]: (state, { payload }) => ({ ...state, location: payload })
};
