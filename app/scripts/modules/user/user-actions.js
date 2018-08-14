import { toastr } from 'react-redux-toastr';
import { createAction, createThunkAction } from 'redux-tools';

// services
import FavouritesService from 'services/favourites-service';
import CollectionsService from 'services/collections-service';

export const toggleActive = createAction('user/toggleActive');
export const setUserToken = createAction('user/setUserToken');
export const updateUserData = createAction('user/updateUserData');

// FAVOURITES
export const setUserFavourites = createAction('user/setUserFavourites');
export const setFavouriteLoading = createAction('user/setUserFavouritesLoading');
export const setFavouriteError = createAction('user/setUserFavouritesError');

export const getUserFavourites = createThunkAction('user/getUserFavourites', () =>
  (dispatch, getState) => {
    const { user = {} } = getState();

    dispatch(setFavouriteLoading(true));

    return FavouritesService.getFavourites(user.token)
      .then(({ data }) => {
        dispatch(setFavouriteLoading(false));
        dispatch(setUserFavourites(data));
      })
      .catch((error) => {
        dispatch(setFavouriteLoading(false));
        dispatch(setFavouriteError(error));
        dispatch(setUserFavourites([]));
      });
  });

export const toggleFavourite = createThunkAction('user/toggleFavourite', (payload = {}) =>
  (dispatch, getState) => {
    const { token } = getState().user;
    const { favourite, resource } = payload;

    if (favourite.id) {
      const { id } = favourite;
      FavouritesService.deleteFavourite(token, id)
        .then(() => {
          // asks for the new updated list of favourites
          dispatch(getUserFavourites());
        })
        .catch((error) => {
          dispatch(setFavouriteError(error));
        });

      return;
    }

    FavouritesService.createFavourite(token, resource)
      .then(() => {
        dispatch(setFavouriteLoading(false));
        // asks for the new updated list of favourites
        dispatch(getUserFavourites());
      })
      .catch(({ errors }) => {
        dispatch(setFavouriteError(errors));
      });
  });

// COLLECTIONS
export const setUserCollections = createAction('user/setUserCollections');
export const setCollectionsError = createAction('user/setUserCollectionsError');
export const setUserCollectionsLoading = createAction('user/setUserCollectionsLoading');
export const setUserCollectionsUpdateLoading = createAction('user/setUserCollectionsUpdateLoading');

export const getUserCollections = createThunkAction('user/getUserCollections', () =>
  (dispatch, getState) => {
    const { token } = getState().user;

    return CollectionsService.getAllCollections(token)
      .then(({ data }) => {
        dispatch(setUserCollections(data));
        dispatch(setUserCollectionsLoading(data));
      })
      .catch(({ errors }) => {
        dispatch(setCollectionsError(errors));
      });
  });

export const addCollection = createThunkAction('user/addCollection', (payload = {}) =>
  (dispatch, getState) => {
    const { token } = getState().user;
    const { collectionName } = payload;

    CollectionsService.createCollection(token, collectionName)
      .then(() => {
        // we ask for the updated list of collections
        dispatch(getUserCollections());
      })
      .catch(({ errors }) => {
        dispatch(setCollectionsError(errors));
        const { status } = errors;

        // we shouldn't assume 400 is duplicated collection,
        // but there's no another way to find it out at this moment
        if (status === 400) {
          toastr.error('Collection duplicated', `The collection "${collectionName}" already exists.`);
        } else {
          toastr.error('Ops, something went wrong.');
        }
      });
  });

export const addResourceToCollection = createThunkAction('user/addResourceToCollection',
  (payload = {}) =>
    (dispatch, getState) => {
      const { token } = getState().user;
      const { collectionId, resource } = payload;

      dispatch(setUserCollectionsUpdateLoading({ id: collectionId, loading: true }));

      CollectionsService.addResourceToCollection(token, collectionId, resource)
        .then(() => {
          dispatch(setUserCollectionsUpdateLoading({ id: collectionId, loading: false }));
          // we ask for the updated list of collections
          dispatch(getUserCollections());
        })
        .catch(({ errors }) => {
          dispatch(setUserCollectionsUpdateLoading({ id: collectionId, loading: false }));
          dispatch(setCollectionsError(errors));
        });
    });

export const removeResourceFromCollection = createThunkAction('user/removeResourceFromCollection',
  (payload = {}) =>
    (dispatch, getState) => {
      const { token } = getState().user;
      const { collectionId, resource } = payload;

      dispatch(setUserCollectionsUpdateLoading({ id: collectionId, loading: true }));

      CollectionsService.removeResourceFromCollection(token, collectionId, resource)
        .then(() => {
          dispatch(setUserCollectionsUpdateLoading({ id: collectionId, loading: false }));
          // we ask for the updated list of collections
          dispatch(getUserCollections());
        })
        .catch(({ errors }) => {
          dispatch(setUserCollectionsUpdateLoading({ id: collectionId, loading: false }));
          dispatch(setCollectionsError(errors));
        });
    });

export const toggleCollection = createThunkAction('user/toggleCollection',
  (payload = {}) =>
    (dispatch) => {
      const { isAdded, collectionId, resource } = payload;

      if (isAdded) dispatch(addResourceToCollection({ collectionId, resource }));
      if (!isAdded) dispatch(removeResourceFromCollection({ collectionId, resource }));
    });


export default {
  toggleActive,
  updateUserData,
  setUserToken,
  setUserFavourites,
  setFavouriteLoading,
  setFavouriteError,
  getUserFavourites,
  toggleFavourite,
  setUserCollections,
  setCollectionsError,
  setUserCollectionsLoading,
  setUserCollectionsUpdateLoading,
  getUserCollections,
  addCollection,
  addResourceToCollection,
  removeResourceFromCollection,
  toggleCollection
};
