import * as actions from './share-modal-actions';

export default {
  [actions.setOpen]: (state, { payload }) => {
    const newState = { ...state, open: payload };

    // We reset the analytics object when the share modal
    // is closed so we don't have cross-contamination
    if (!payload) {
      newState.analytics = null;
    }

    return newState;
  },
  [actions.setLinks]: (state, { payload }) => ({ ...state, links: payload }),
  [actions.setTab]: (state, { payload }) => ({ ...state, tab: payload }),
  [actions.setAnalytics]: (state, { payload }) => ({ ...state, analytics: payload })
};
