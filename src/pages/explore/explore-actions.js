import qs from 'query-string';
import omit from 'lodash/omit';
import { createAction, createThunkAction } from 'redux-tools';
import { replace } from 'react-router-redux';
import { setDatasetsTagFilter } from 'actions/datasets';
import { wriAPISerializer } from 'wri-json-api-serializer';
import { calcZIndex } from 'components/map-vis/map-vis-helper';

// services
import DatasetFilterService from 'services/dataset-filter-service';
import GraphService from 'services/graph-service';

// helpers
import { getSelectedElements, selectElementsFromTree } from 'helpers/dropdown-tree';

export const setSidebar = createAction('explore/setSidebar');

// Update URL
export const updateURLParams = createThunkAction('updateURLParams', () => (dispatch, getState) => {
  const { explorePage, routing } = getState();
  const { tab, datasets, coreDatasets, datasetFilters, map } = explorePage;
  const { location } = coreDatasets;
  const { filters } = datasetFilters;
  const { filterQuery, activeDatasets } = datasets;
  const activeDatasetsResult = activeDatasets && activeDatasets.length ?
    activeDatasets.map(({ id, opacity, visibility, zIndex }) => `${id}|${opacity}|${visibility}|${zIndex}`) : [];
  const filtersParams = {};

  (Object.keys(filters) || []).forEach((key) => {
    Object.assign(filtersParams, { [key]: filters[key].join(',') });
  });

  const query = {
    ...omit(map, 'bbox'),
    tab,
    filterQuery,
    ...filtersParams,
    location,
    activeDatasets: activeDatasetsResult
  };

  dispatch(replace({ pathname: routing.locationBeforeTransitions.pathname, query }));
});

export const setTab = createThunkAction('setTab', () => (dispatch) => {
  dispatch(updateURLParams());
});

// Location filter
export const setLocation = createThunkAction('setLocation', () => (dispatch) => {
  dispatch(updateURLParams());
});
export const receiveLocations = createAction('receiveLocations');
export const failureLocations = createAction('failureLocations');
export const fetchLocations = createThunkAction('fetchLocations', () => (dispatch) => {
  const url = `${process.env.REACT_APP_RW_API_URL}/geostore/admin/list`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) return response.json();
      throw Error(response);
    })
    .then((json) => {
      dispatch(receiveLocations(json.data));
    })
    .catch(error => dispatch(failureLocations(error)));
});

// Datasets list
export const setActiveDatasets = createAction('setActiveDatasets');
export const updateActiveDatasets = createAction('updateActiveDatasets');
export const setZIndex = createAction('setZIndex');
export const updateZIndex = createThunkAction('updateZIndex', () => (dispatch) => {
  dispatch(updateActiveDatasets());
  dispatch(updateURLParams());
});
export const updateOpacity = createThunkAction('updateOpacity', () => (dispatch) => {
  dispatch(updateActiveDatasets());
  dispatch(updateURLParams());
});
export const receiveDatasets = createAction('receiveDatasets');
export const failureDatasets = createAction('failureDatasets');

// Dataset filters
export const setDataFilters = createAction('explore-dataset-filters/setDataFilters');
export const setGraphFilter = createAction('explore-dataset-filters/setGraphFilter');
export const clearFilters = createAction('explore-dataset-filters/clearFilters');

export const setDatasetFilter = createAction('explore-dataset-filters/setDatasetFilter');
export const updateDataFilters = createAction('explore-dataset-filters/updateDataFilters');
export const setInitialFilterStatus = createThunkAction('explore-dataset-filters/setInitialFilterStatus', () => (dispatch, getState) => {
  const { data, originalData, filters } = getState().explorePage.datasetFilters;
  const newdata = Object.assign({}, data);
  // const _originalData = Object.assign({}, originalData);

  if (!Object.keys(data).length) {
    dispatch(updateDataFilters({}));
    return;
  }
  if (!Object.keys(filters).length) {
    dispatch(updateDataFilters({ ...originalData }));
    return;
  }

  const newData = getSelectedElements(newdata, filters);

  Object.keys(filters).forEach((filterKey) => {
    const filterValues = filters[filterKey];
    const dataTree = newData[filterKey] || [];

    dataTree.forEach(child => selectElementsFromTree(child, filterValues));
  });

  dispatch(updateDataFilters(newData));
});

export const fetchDatasets = createThunkAction('fetchDatasets', () => (dispatch) => {
  const params = {
    application: ['prep'].join(','),
    includes: ['metadata', 'layer', 'vocabulary', 'widget'].join(','),
    'page[size]': 999,
    status: 'saved',
    published: true,
    env: process.env.REACT_APP_DATASET_ENV || 'production'
  };
  const url = `${process.env.REACT_APP_RW_API_URL}/dataset?${qs.stringify(params)}`;
  return fetch(url, {
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
      const datasets = wriAPISerializer(json);
      dispatch(receiveDatasets(datasets));
      dispatch(updateActiveDatasets());
    })
    .catch(error => dispatch(failureDatasets(error)));
});

export const receiveCoreDatasets = createAction('receiveCoreDatasets');
export const failureCoreDatasets = createAction('failureCoreDatasets');
export const fetchCoreDatasets = createThunkAction('fetchCoreDatasets', () => (dispatch) => {
  const params = {
    published: true,
    env: process.env.REACT_APP_DATASET_ENV || 'production'
  };
  const url = `${process.env.REACT_APP_API_URL}/core_datasets?${qs.stringify(params)}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      if (response.ok) return response.json();
      throw Error(response);
    })
    .then((json) => {
      dispatch(receiveCoreDatasets(json));
    })
    .catch(error => dispatch(failureCoreDatasets(error)));
});

export const toggleInfo = createAction('toggleInfo');
export const toggleDataset = createThunkAction('toggleDataset', () => (dispatch) => {
  dispatch(updateActiveDatasets());
  dispatch(updateURLParams());
});
export const toggleVisibility = createThunkAction('toggleVisibility', () => (dispatch) => {
  dispatch(updateActiveDatasets());
  dispatch(updateURLParams());
});
export const filterQuery = createThunkAction('filterQuery', () => (dispatch) => {
  dispatch(updateURLParams());
});

// Map
export const setMapParams = createThunkAction('setMapParams', () => (dispatch) => {
  dispatch(updateURLParams());
});
export const setBasemap = createThunkAction('setBasemap', () => (dispatch) => {
  dispatch(updateURLParams());
});
export const setLabels = createThunkAction('setLabels', () => (dispatch) => {
  dispatch(updateURLParams());
});
export const setBoundaries = createThunkAction('setBoundaries', () => (dispatch) => {
  dispatch(updateURLParams());
});
export const setWater = createThunkAction('setWater', () => (dispatch) => {
  dispatch(updateURLParams());
});


// URL
export const initialURLParams = createThunkAction('initialURLParams', () => (dispatch, getState) => {
  const { routing } = getState();
  const {
    basemap, labels, boundaries, water,
    zoom, lat, lng,
    location, tab,
    activeDatasets,
    topics,
    geographies,
    dataTypes,
    periods
  } = routing.locationBeforeTransitions.query;
  const query = routing.locationBeforeTransitions.query.filterQuery;
  const isEmbed = routing.locationBeforeTransitions.pathname.search('embed') > 0;

  if (zoom && lat && lng) dispatch(setMapParams({ zoom: parseInt(zoom, 10), lat: parseFloat(lat), lng: parseFloat(lng) }));
  if (basemap) dispatch(setBasemap(basemap));
  if (labels) dispatch(setLabels(isEmbed ? 'dark' : labels));
  if (boundaries) dispatch(setBoundaries(isEmbed && boundaries === 'true'));
  if (water) dispatch(setWater(water));
  if (location) dispatch(setLocation(location));
  if (query) dispatch(filterQuery(query));
  if (tab) dispatch(setTab(tab));
  if (topics) dispatch(setDatasetFilter({ topics: topics.split(',') }));
  if (geographies) dispatch(setDatasetFilter({ geographies: geographies.split(',') }));
  if (dataTypes) dispatch(setDatasetFilter({ dataTypes: dataTypes.split(',') }));
  if (periods) dispatch(setDatasetFilter({ periods: periods.split(',') }));

  if (activeDatasets) {
    const activeDatasetsResult = typeof activeDatasets === 'string' ? [activeDatasets] : activeDatasets;
    dispatch(setActiveDatasets(activeDatasetsResult.map((s, i) => {
      const parsedSt = s.split('|');
      const params = {};
      if (parsedSt.length) {
        // eslint-disable-next-line prefer-destructuring
        if (parsedSt[0]) params.id = parsedSt[0];
        params.opacity = typeof parsedSt[1] === 'undefined' ? 1 : parseFloat(parsedSt[1]);
        params.visibility = typeof parsedSt[2] === 'undefined' || parsedSt[2] !== 'true' || parsedSt[2] !== 'false' ?
          true : parsedSt[2] === 'true';
        params.zIndex = typeof parsedSt[3] === 'undefined' ? i : parseInt(parsedSt[3], 10);
        params.layerIndex = calcZIndex(activeDatasetsResult.length, params.zIndex);
      }
      return params;
    })));
  }
});

export const getFiltersData = createThunkAction('explore-dataset-filters/getFiltersData', () =>
  (dispatch) => {
    Promise.all([
      DatasetFilterService.getTopics(),
      DatasetFilterService.getGeographies(),
      DatasetFilterService.getDataTypes(),
      DatasetFilterService.getPeriods()
    ]).then((values = []) => {
      const data = {};
      values.forEach(val => Object.assign(data, val));
      dispatch(setDataFilters(data));
      dispatch(setInitialFilterStatus());
    });
  });

export const onClearFilters = createThunkAction('explore-dataset-filters/onClearFilters', (updateURL = true) =>
  (dispatch) => {
    dispatch(getFiltersData());
    dispatch(clearFilters());
    dispatch(setInitialFilterStatus());
    if (updateURL) {
      dispatch(updateURLParams());
    }
  });

export const onSetDatasetFilter = createThunkAction('explore-dataset-filters/onSetDatasetFilter', (filter = {}) =>
  (dispatch) => {
    const key = Object.keys(filter)[0];
    dispatch(setDatasetFilter(filter));
    // dispatch(updateDataFilters());
    dispatch(setDatasetsTagFilter(key, filter[key])); // this is bullshit, but need it to keep consistency. Remove ASAP
    dispatch(updateURLParams());
  });

export const getDatasetsByGraph = createThunkAction('explore-page/getDatasetsByGraph', () =>
  (dispatch, getState) => {
    const { explorePage } = getState();
    const { filters } = explorePage.datasetFilters;
    const { topics, geographies, dataTypes, periods } = filters;

    if (!((topics || []).length) && !((geographies || []).length)
      && !((dataTypes || []).length) && !((periods || []).length)) {
      dispatch(setGraphFilter([]));
      return;
    }

    GraphService.searchDatasetsByConcepts(filters)
      .then(({ data }) => dispatch(setGraphFilter(data)))
      .catch(({ errors }) => {
        const { status, details } = errors;
        console.error(status, details);
      });
  });

export const setMultiActiveLayer = createAction('explore-dataset-list/setMultiActiveLayer');
export const setBBox = createAction('explore-dataset-list/setBBox');

export const setInteractions = createAction('explore-page/setInteractions');
