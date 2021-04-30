import * as actions from './partners-actions';

export default {
  [actions.setPartners]: (state, { payload }) => ({ ...state, list: payload }),
  [actions.setPartnersLoading]: (state, { payload }) => ({ ...state, loading: payload }),
  [actions.setPartnersError]: (state, { payload }) => ({ ...state, error: payload })
};
