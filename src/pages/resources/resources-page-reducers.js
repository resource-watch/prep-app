import * as actions from './resources-page-actions';

export default {
  [actions.setResources]: (state, { payload }) => ({ ...state, resources: payload }),
  [actions.setResourcesLoading]: (state, { payload }) => ({ ...state, loading: payload }),
  [actions.setResourcesError]: (state, { payload }) => ({ ...state, error: payload })
};
