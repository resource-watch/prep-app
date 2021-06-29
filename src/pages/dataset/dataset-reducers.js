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
  }),

  [actions.fetchAdditionalDataset]: (state) => ({
    ...state,
    isAdditionalDataFetching: true,
    additionalDataError: null,
    additionalData: null,
  }),
  [actions.failureAdditionalDataset]: (state, { payload }) => ({
    ...state,
    isAdditionalDataFetching: false,
    additionalDataError: payload,
    additionalData: null,
  }),
  [actions.receiveAdditionalDataset]: (state, { payload }) => ({
    ...state,
    isAdditionalDataFetching: false,
    additionalDataError: null,
    additionalData: payload
  })
};
