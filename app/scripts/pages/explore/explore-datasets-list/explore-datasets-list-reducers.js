import find from 'lodash/find';
import { calcZIndex } from 'components/map-vis/map-vis-helper';

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
      layerIndex: 0,
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
    items: addExploreAttributes(payload, state.datasets.activeDatasets)
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
  const { length } = activeDatasets;
  return {
    ...state,
    datasets: {
      ...state.datasets,
      items: state.datasets.items.map((item) => {
        const zIndex = (length + 1) === 1 ? 0 : length;
        if (item.id === payload.id) {
          return Object.assign({}, item, {
            isLayerActive: !item.isLayerActive,
            zIndex
          });
        }
        return item;
      })
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

export const toggleVisibility = (state, { payload }) => ({
  ...state,
  datasets: {
    ...state.datasets,
    items: state.datasets.items.map(item => (item.id === payload.id ?
      Object.assign({}, item, { visibility: !item.visibility }) : item))
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
  const layers = payload.map((l, index) => ({ id: l.dataset, zIndex: index }));
  const { length } = layers;
  const items = state.datasets.items.slice(0).map((item) => {
    const itemFound = find(layers, { id: item.id });
    if (itemFound) {
      const { zIndex } = itemFound;
      return Object.assign({}, item, {
        zIndex,
        layerIndex: calcZIndex(length, zIndex)
      });
    }
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

export const updateOpacity = (state, { payload }) => {
  const { id, opacity } = payload;
  const datasets = [...state.datasets.items];

  const items = datasets.map((dataset) => {
    if (dataset.id === id) return { ...dataset, opacity };
    return dataset;
  });

  return {
    ...state,
    datasets: {
      ...state.datasets,
      items
    }
  };
};
