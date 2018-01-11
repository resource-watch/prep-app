import * as actions from './share-modal-actions';

export default {
  [actions.toggleSharedModal]: (state, { payload }) => ({ ...state, open: payload }),
  [actions.updateLinks]: (state, { payload }) => ({ ...state, links: payload }),
  [actions.setActiveTab]: (state, { payload }) => ({ ...state, activeTab: payload })
};
