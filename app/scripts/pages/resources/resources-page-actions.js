import * as queryString from 'query-string';
import { createAction, createThunkAction } from 'redux-tools';

export const setResources = createAction('resources-page/setResources');
export const setResourcesLoading = createAction('resources-page/setResourcesLoading');
export const setResourcesError = createAction('resources-page/setResourcesError');

export const getResources = createThunkAction('resources-page/getResources', () =>
  (dispatch) => {
    dispatch(setResourcesLoading(true));
    const queryParams = queryString.stringify({
      published: true
    });

    fetch(`${config.apiUrl}/resources?${queryParams}`)
      .then((response) => {
        dispatch(setResourcesLoading(false));
        const { status, statusText } = response;
        if (status === 200) return response.json();

        const errorObject = {
          errors: {
            status,
            details: statusText
          }
        };
        throw errorObject;
      })
      .then((data) => {
        dispatch(setResources(data));
      })
      .catch((errors) => {
        console.error(errors); // for debugging porposes
        dispatch(setResourcesError(true));
      });
  });

export default {
  getResources
};
