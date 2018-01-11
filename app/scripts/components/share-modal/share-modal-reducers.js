import * as actions from './share-modal-actions';

export default {
  [actions.setOpen]: (state, { payload }) => ({ ...state, open: payload }),
  [actions.setLinks]: (state, { payload }) => ({ ...state, links: payload }),
  [actions.setTab]: (state, { payload }) => ({ ...state, tab: payload })
};
