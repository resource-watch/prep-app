import * as actions from './embed-modal-actions';

export default {
  [actions.setModal]: (state, { payload }) => ({ ...state, ...payload }),
  [actions.setOpen]: (state, { payload }) => ({ ...state, open: payload }),
  [actions.setConfig]: (state, { payload }) => ({ ...state, config: payload })
};
