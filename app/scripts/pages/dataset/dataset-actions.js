import qs from 'query-string';
import { createAction, createThunkAction } from 'redux-tools';
import { wriAPISerializer } from 'wri-json-api-serializer';

// Getting dataset
export const receiveDataset = createAction('receiveDataset');
export const failureDataset = createAction('failureDataset');
export const fetchDataset = createThunkAction('fetchDataset', (datasetId) => {
  const includes = ['metadata', 'layer', 'widget', 'vocabulary'];
  const params = {
    application: 'prep',
    status: 'saved',
    includes: `${includes.join(',')}`,
    env: config.datasetEnv || 'production'
  };

  return (dispatch) => {
    fetch(`${config.apiUrlRW}/dataset/${datasetId}?${qs.stringify(params)}`, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw Error(response);
      })
      .then((json) => {
        dispatch(receiveDataset(wriAPISerializer(json)));
      })
      .catch(error => dispatch(failureDataset(error)));
  };
});
