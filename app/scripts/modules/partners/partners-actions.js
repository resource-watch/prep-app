import { createAction, createThunkAction } from 'redux-tools';

export const setPartners = createAction('partners/setPartners');
export const setPartnersLoading = createAction('partners/setPartnersLoading');
export const setPartnersError = createAction('partners/setPartnersError');

export const getPartners = createThunkAction('partners/getPartners', () =>
  (dispatch) => {
    dispatch(setPartnersLoading(true));
    fetch(`${config.apiUrl}/partners`)
      .then((response) => {
        dispatch(setPartnersLoading(false));
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
        dispatch(setPartners(data));
      })
      .catch((errors) => {
        console.error(errors); // for debugging porposes
        dispatch(setPartnersError(true));
      });
  }
);

export default {
  getPartners,
  setPartners,
  setPartnersLoading,
  setPartnersError
};
