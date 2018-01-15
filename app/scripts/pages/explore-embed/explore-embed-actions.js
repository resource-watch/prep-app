import qs from 'query-string';
import { createAction, createThunkAction } from 'redux-tools';
import { replace } from 'react-router-redux';
import { setDatasetsTagFilter } from 'actions/datasets';
import { wriAPISerializer } from 'helpers/wri-api-serializer';

// services
import DatasetFilterService from 'services/dataset-filter-service';
import GraphService from 'services/graph-service';

// Update URL
export const updateURLParams = createThunkAction('updateURLParams', () => (dispatch, getState) => {
  const { exploreEmbedPage } = getState();
  const { tab, datasets, coreDatasets, datasetFilters, map } = exploreEmbedPage;
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
    ...map,
    tab,
    filterQuery,
    ...filtersParams,
    location,
    activeDatasets: activeDatasetsResult
  };

  dispatch(replace({ pathname: '/embed/explore', query }));
});

export const setTab = createThunkAction('setTab', () => (dispatch) => {
  dispatch(updateURLParams());
});

// Location filter
export const setLocation = createThunkAction('setLocation', () => (dispatch) => {
  dispatch(updateURLParams());
});

// Datasets list
export const setActiveDatasets = createAction('setActiveDatasets');
export const updateActiveDatasets = createAction('updateActiveDatasets');
export const setZIndex = createAction('setZIndex');
export const updateZIndex = createThunkAction('updateZIndex', () => (dispatch) => {
  dispatch(updateURLParams());
});
export const updateOpacity = createThunkAction('updateOpacity', () => (dispatch) => {
  dispatch(updateURLParams());
});
export const receiveDatasets = createAction('receiveDatasets');
export const failureDatasets = createAction('failureDatasets');

// Dataset filters
export const setDataFilters = createAction('explore-dataset-filters/setDataFilters');
export const setGraphFilter = createAction('explore-dataset-filters/setGraphFilter');

export const fetchDatasets = createThunkAction('fetchDatasets', () => (dispatch) => {
  const params = {
    application: ['prep'].join(','),
    includes: ['metadata', 'layer', 'vocabulary', 'widget'].join(','),
    'page[size]': 999,
    status: 'saved',
    published: true,
    env: config.datasetEnv || 'production'
  };
  const url = `${config.apiUrlRW}/dataset?${qs.stringify(params)}`;
  return fetch(url)
    .then((response) => {
      if (response.ok) return response.json();
      throw Error(response);
    })
    .then((json) => {
      const datasets = wriAPISerializer(json);
      // const nexgdpDatasets = datasets.filter(d => (d.provider === 'nexgddp'));
      // console.log(nexgdpDatasets);
      dispatch(receiveDatasets(datasets));
      dispatch(updateActiveDatasets());
    })
    .catch(error => dispatch(failureDatasets(error)));
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


export const setDatasetFilter = createThunkAction('explore-dataset-filters/setDatasetFilter', () => (dispatch) => {
  dispatch(updateURLParams());
});

// URL
export const initialURLParams = createThunkAction('initialURLParams', () => (dispatch, getState) => {
  const { routing } = getState();
  const {
    basemap, labels, boundaries,
    zoom, lat, lng,
    location, tab,
    activeDatasets,
    topics,
    geographies,
    dataTypes,
    periods
  } = routing.locationBeforeTransitions.query;
  const query = routing.locationBeforeTransitions.query.filterQuery;

  if (zoom && lat && lng) dispatch(setMapParams({ zoom: parseInt(zoom, 10), lat: parseFloat(lat), lng: parseFloat(lng) }));
  if (basemap) dispatch(setBasemap(basemap));
  if (labels) dispatch(setLabels(labels));
  if (boundaries) dispatch(setBoundaries(boundaries === 'true'));
  if (location) dispatch(setLocation(location));
  if (query) dispatch(filterQuery(query));
  if (tab) dispatch(setTab(tab));
  if (topics) dispatch(setDatasetFilter({ topics: topics.split(',') }));
  if (geographies) dispatch(setDatasetFilter({ geographies: geographies.split(',') }));
  if (dataTypes) dispatch(setDatasetFilter({ dataTypes: dataTypes.split(',') }));
  if (periods) dispatch(setDatasetFilter({ periods: periods.split(',') }));

  if (activeDatasets) {
    const activeDatasetsResult = typeof activeDatasets === 'string' ? [activeDatasets] : activeDatasets;
    dispatch(setActiveDatasets(activeDatasetsResult.map((s) => {
      const parsedSt = s.split('|');
      return {
        id: parsedSt[0],
        opacity: parseFloat(parsedSt[1]),
        visibility: parsedSt[2] === 'true',
        zIndex: parseInt(parsedSt[3], 10)
      };
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
    ]
    ).then((values = []) => {
      const data = {};
      values.map(val => Object.assign(data, val));
      dispatch(setDataFilters(data));
    });
  }
);

export const onSetDatasetFilter = createThunkAction('explore-dataset-filters/onSetDatasetFilter', (filter = {}) =>
  (dispatch) => {
    const key = Object.keys(filter)[0];
    dispatch(setDatasetFilter(filter));
    dispatch(setDatasetsTagFilter(key, filter[key])); // this is bullshit, but need it to keep consistency. Remove ASAP
    dispatch(updateURLParams());
  }
);

export const getDatasetsByGraph = createThunkAction('explore-page/getDatasetsByGraph', () =>
  (dispatch, getState) => {
    const { exploreEmbedPage } = getState();
    const { filters } = exploreEmbedPage.datasetFilters;
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
  }
);

export const setNexGDDPActiveLayer = createAction('explore-dataset-list/setNexGDDPActiveLayer');
