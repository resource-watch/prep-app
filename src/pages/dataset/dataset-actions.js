import qs from 'query-string';
import { createAction, createThunkAction } from 'redux-tools';
import { wriAPISerializer } from 'wri-json-api-serializer';

// Getting additional datasets
export const receiveAdditionalDataset = createAction('receiveAdditionalDataset');
export const failureAdditionalDataset = createAction('failureAdditionalDataset');
/**
 * datasetIds {Array} [absolute-low, absolute-high, change-low, change-high]
 */
export const fetchAdditionalDataset = createThunkAction('fetchAdditionalDataset', (datasetIds) => {
  const includes = ['layer'];
  const params = {
    application: 'prep',
    status: 'saved',
    includes: `${includes.join(',')}`,
    env: config.datasetEnv || 'production'
  };
  const promises = Promise.all(
    datasetIds.map(
      (datasetId) => fetch(`${config.apiUrlRW}/dataset/${datasetId}?${qs.stringify(params)}`, {
        headers: {
          'Content-Type': 'application/json',
          'Upgrade-Insecure-Requests': 1
        }
      }).then((response) => {
        if (response.ok) return response.json();
        throw Error(response);
      })
    )
  );

  return (dispatch) => {
    promises
      .then((results) => {
        const serializedResults = results.map((result) => wriAPISerializer(result));
        dispatch(receiveAdditionalDataset({
          absolute: {
            low: serializedResults[0],
            high: serializedResults[1],
          },
          change: {
            low: serializedResults[2],
            high: serializedResults[3],
          },
        }));
      })
      .catch(error => dispatch(failureAdditionalDataset(error)));
  };
});

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
        const result = wriAPISerializer(json);
        const { metadata } = result;
        const { info } = metadata[0];
        const { absolute, change } = info;

        dispatch(receiveDataset(result));
        dispatch(fetchAdditionalDataset([absolute.low, absolute.high, change.low, change.high]));
      })
      .catch(error => dispatch(failureDataset(error)));
  };
});
