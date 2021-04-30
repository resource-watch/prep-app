import * as actions from './user-actions';

export default {
  [actions.toggleActive]: (state, { payload }) => ({ ...state, active: payload }),
  [actions.setUserToken]: (state, { payload }) => ({ ...state, token: payload }),
  [actions.updateUserData]: (state, { payload }) => ({ ...state, data: payload }),
  [actions.setUserFavourites]: (state, { payload }) => ({
    ...state,
    favourites: {
      ...state.favourites,
      items: payload
    }
  }),
  [actions.setFavouriteLoading]: (state, { payload }) => ({
    ...state,
    favourites: {
      ...state.favourites,
      loading: payload
    }
  }),
  [actions.setFavouriteError]: (state, { payload }) => ({
    ...state,
    favourites: {
      ...state.favourites,
      error: payload
    }
  }),
  [actions.setUserCollections]: (state, { payload }) => ({
    ...state,
    collections: {
      ...state.collections,
      items: payload
    }
  }),
  [actions.setCollectionsError]: (state, { payload }) => ({
    ...state,
    collections: {
      ...state.collections,
      error: payload
    }
  }),
  [actions.setUserCollectionsLoading]: (state, { payload }) => ({
    ...state,
    collections: {
      ...state.collections,
      loadingQueue: payload.map(collection =>
        ({ id: collection.id, loading: false }))
    }
  }),
  [actions.setUserCollectionsUpdateLoading]: (state, { payload }) => {
    const { id, loading } = payload;
    const loadingQueue = [...state.collections.loadingQueue];
    const index = loadingQueue.findIndex(loader => loader.id === id);

    if (index === -1) return state;

    loadingQueue[index] = { id, loading };

    return {
      ...state,
      collections: {
        ...state.collections,
        loadingQueue
      }
    };
  }
};
