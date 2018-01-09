import find from 'lodash/find';
import { wriAPISerializer } from 'helpers/wri-api-serializer';

/**
 * This function will add all necessary attributes to work in explore page.
 * Furthermore it will set initial params from url.
 * @param {Array} items
 * @param {Array} activeDatasets
 */
function addExploreAttributes(items, activeDatasets) {
  return items.map((dataset) => {
    const existingDataset = find(activeDatasets, { id: dataset.id });
    return Object.assign({}, {
      opacity: 1,
      visibility: true,
      zIndex: 0,
      isLayerActive: !!existingDataset
    }, existingDataset || {}, dataset);
  });
}

export const fetchDatasets = state => ({
  ...state,
  datasets: { ...state.datasets, isFetching: true }
});

export const receiveDatasets = (state, { payload }) => ({
  ...state,
  datasets: {
    ...state.datasets,
    isFetching: false,
    status: 'success',
    items: addExploreAttributes(wriAPISerializer(payload), state.datasets.activeDatasets)
  }
});

export const failureDatasets = (state, { payload }) => ({
  ...state,
  datasets: { ...state.datasets, isFetching: false, status: 'error', message: payload }
});

export const filterQuery = (state, { payload }) => ({
  ...state,
  datasets: { ...state.datasets, filterQuery: payload }
});

export const toggleDataset = (state, { payload }) => {
  const activeDatasets = state.datasets.activeDatasets;
  return {
    ...state,
    datasets: {
      ...state.datasets,
      items: state.datasets.items.map(item => (item.id === payload.id ?
        Object.assign({}, item, {
          isLayerActive: !item.isLayerActive,
          zIndex: item.zIndex || activeDatasets.length + 1
        }) : item))
    }
  };
};

export const toggleInfo = (state, { payload }) => ({
  ...state,
  datasets: {
    ...state.datasets,
    items: state.datasets.items.map(item => (item.id === payload.id ?
      Object.assign({}, item, { isSelected: !item.isSelected }) :
      Object.assign({}, item, { isSelected: false })))
  }
});

export const setActiveDatasets = (state, { payload }) => ({
  ...state,
  datasets: {
    ...state.datasets,
    activeDatasets: typeof payload === 'string' ? [payload] : payload
  }
});

export const updateActiveDatasets = state => ({
  ...state,
  datasets: {
    ...state.datasets,
    activeDatasets: state.datasets.items.filter(d => d.isLayerActive)
  }
});

export const updateZIndex = (state, { payload }) => {
  const layers = payload.map((l, index) => ({ id: l.dataset, zIndex: index + 1 }));
  const items = state.datasets.items.slice(0).map((item) => {
    const itemFound = find(layers, { id: item.id });
    if (itemFound) return Object.assign({}, item, { zIndex: itemFound.zIndex });
    return item;
  });

  return {
    ...state,
    datasets: {
      ...state.datasets,
      items
    }
  };
};
