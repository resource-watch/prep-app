import * as actions from './dataset-actions';

export default {
  [actions.fetchDataset]: (state) => ({
    ...state,
    isFetching: true
  }),
  [actions.failureDataset]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    status: 'error',
    message: payload
  }),
  [actions.receiveDataset]: (state, { payload }) => ({
    ...state,
    isFetching: false,
    status: 'success',
    data: payload
  })
};
