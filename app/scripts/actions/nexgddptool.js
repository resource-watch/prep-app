import { replace } from 'react-router-redux';
import fieldsMock from 'components/nexgddp-tool/mocks/fields.json';
import {
  NEXGDDP_SET_MAP_ZOOM,
  NEXGDDP_SET_MAP_CENTER,
  NEXGDDP_SET_MARKER_POSITION,
  NEXGDDP_SET_MAP_MODE,
  NEXGDDP_SET_GRAPH_MODE,
  NEXGDDP_SET_SCENARIO_OPTIONS,
  NEXGDDP_SET_SCENARIO_SELECTION,
  NEXGDDP_SET_RANGE1_OPTIONS,
  NEXGDDP_SET_RANGE1_SELECTION,
  NEXGDDP_SET_RANGE2_OPTIONS,
  NEXGDDP_SET_RANGE2_SELECTION,
  NEXGDDP_SET_CHART_DATA,
  NEXGDDP_SET_CHART_LOADED,
  NEXGDDP_SET_CHART_ERROR
} from '../constants';

export function updateUrl() {
  return (dispatch, getState) => {
    const state = getState().nexgddptool;
    const params = {
      zoom: state.map.zoom,
      lat: state.map.center
        ? state.map.center[0]
        : undefined,
      lng: state.map.center
        ? state.map.center[1]
        : undefined,
      markerLat: state.marker ? state.marker[0] : undefined,
      markerLng: state.marker ? state.marker[1] : undefined,
      mapMode: state.mapMode,
      graphMode: state.graphMode,
      scenario: state.scenario.selection
        ? state.scenario.selection.value
        : undefined,
      range1: state.range1.selection
        ? state.range1.selection.value
        : undefined,
      range2: state.range2.selection
        ? state.range2.selection.value
        : undefined
    };

    const url = Object.keys(params)
      .filter(key => params[key] !== undefined)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .reduce(
        (res, chunk, index) => `${res}${index === 0 ? '?' : '&'}${chunk}`,
        location.pathname
      );

    dispatch(replace(url));
  };
}

export function resetChartData() {
  return (dispatch) => {
    dispatch({
      type: NEXGDDP_SET_CHART_LOADED,
      payload: false
    });

    dispatch({
      type: NEXGDDP_SET_CHART_ERROR,
      payload: false
    });

    dispatch({
      type: NEXGDDP_SET_CHART_DATA,
      payload: []
    });
  };
}

export function setMapZoom(zoom, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXGDDP_SET_MAP_ZOOM,
      payload: zoom
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setMapCenter(center, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXGDDP_SET_MAP_CENTER,
      payload: center
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setMarkerPosition(coordinates, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXGDDP_SET_MARKER_POSITION,
      payload: coordinates
    });

    dispatch(resetChartData());

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setMapMode(mapMode, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXGDDP_SET_MAP_MODE,
      payload: mapMode
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setGraphMode(graphMode, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXGDDP_SET_GRAPH_MODE,
      payload: graphMode
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setScenarioOptions(options) {
  return (dispatch) => {
    dispatch({
      type: NEXGDDP_SET_SCENARIO_OPTIONS,
      payload: options
    });
  };
}

export function setScenarioSelection(selection, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXGDDP_SET_SCENARIO_SELECTION,
      payload: selection
    });

    dispatch(resetChartData());

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setRange1Options(options) {
  return (dispatch) => {
    dispatch({
      type: NEXGDDP_SET_RANGE1_OPTIONS,
      payload: options
    });
  };
}

export function setRange1Selection(selection, changeUrl = true) {
  return (dispatch, getState) => {
    // We set the selection
    dispatch({
      type: NEXGDDP_SET_RANGE1_SELECTION,
      payload: selection
    });

    // If the selection is the same as the one of the
    // second range selector, we reset it
    const range2Selection = getState().nexgddptool.range2.selection;
    if (range2Selection && selection.value === range2Selection.value) {
      dispatch({
        type: NEXGDDP_SET_RANGE2_SELECTION,
        payload: undefined
      });
    }

    dispatch(resetChartData());

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setRange2Options(options) {
  return (dispatch) => {
    dispatch({
      type: NEXGDDP_SET_RANGE2_OPTIONS,
      payload: options
    });
  };
}

export function setRange2Selection(selection, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXGDDP_SET_RANGE2_SELECTION,
      payload: selection
    });

    dispatch(resetChartData());

    if (changeUrl) dispatch(updateUrl());
  };
}

export function getUrlState() {
  return (dispatch, getState) => {
    const params = location.search
      .substring(1, location.search.length)
      .split('&')
      .map(chunk => ({ [chunk.split('=')[0]]: decodeURIComponent(chunk.split('=')[1]) }))
      .reduce((res, param) => ({ ...res, ...param }), {});

    if (params.zoom) dispatch(setMapZoom(+params.zoom, false));
    if (params.lat && params.lng) dispatch(setMapCenter([+params.lat, +params.lng], false));
    if (params.markerLat && params.markerLng) dispatch(setMarkerPosition([+params.markerLat, +params.markerLng], false));
    if (params.mapMode) dispatch(setMapMode(params.mapMode, false));
    if (params.graphMode) dispatch(setGraphMode(params.graphMode, false));
    if (params.scenario) {
      const scenarioOptions = getState().nexgddptool.scenario.options;
      const scenarioOption = scenarioOptions.find(s => s.value === params.scenario);
      if (scenarioOption) dispatch(setScenarioSelection(scenarioOption, false));
    }
    if (params.range1) {
      const range1Options = getState().nexgddptool.range1.options;
      const range1Option = range1Options.find(s => s.value === params.range1);
      if (range1Option) dispatch(setRange1Selection(range1Option, false));
    }
    if (params.range2) {
      const range2Options = getState().nexgddptool.range2.options;
      const range2Option = range2Options.find(s => s.value === params.range2);
      if (range2Option) dispatch(setRange2Selection(range2Option, false));
    }

    // Needed to chain the action
    return Promise.resolve();
  };
}

export function setDefaultState() {
  return (dispatch, getState) => {
    const store = getState().nexgddptool;

    if (!store.range1.selection && store.range1.options.length) {
      dispatch(setRange1Selection(store.range1.options[0]));
    }

    if (!store.scenario.selection && store.scenario.options.length) {
      dispatch(setScenarioSelection(store.scenario.options[0]));
    }

    // Needed to chain the action
    return Promise.resolve();
  };
}

export function getSelectorsInfo() {
  return (dispatch) => {
    fetch(`${process.env.RW_API_URL}/query?sql=select min(year) as startdate, max(year) as enddate from test_decadal_tasavg`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Unable to fetch the date range');
      })
      .then(json => json.data[0])
      .then(({ startdate, enddate }) => {
        const startYear = new Date(startdate).getUTCFullYear();
        const endYear = new Date(enddate).getUTCFullYear();
        let yearPointer = startYear;
        const dateRangeOptions = [];

        while (yearPointer + 10 <= endYear) {
          dateRangeOptions.push({
            label: `${yearPointer}-${yearPointer + 9}`,
            value: `${yearPointer}`
          });
          yearPointer += 10;
        }

        dispatch(setRange1Options(dateRangeOptions));
        dispatch(setRange1Selection(dateRangeOptions[0]));
        dispatch(setRange2Options(dateRangeOptions));
      })
      .catch(err => console.error(err));


    // Temporary code
    const promise = Promise.resolve(fieldsMock);

    promise.then(({ meta }) => {
      // const date = meta.coverageBounds.Date;
      const scenarios = meta.coverageBounds.Scenarios;

      // // We compute the date range options
      // const startYear = new Date(date[0]).getFullYear();
      // const endYear = new Date(date[1]).getFullYear();
      // let yearPointer = startYear;
      // const dateRangeOptions = [];

      // while (yearPointer + 10 <= endYear) {
      //   dateRangeOptions.push({
      //     label: `${yearPointer}-${yearPointer + 10}`,
      //     value: `${yearPointer}`
      //   });
      //   yearPointer += 10;
      // }

      // dispatch(setRange1Options(dateRangeOptions));
      // dispatch(setRange2Options(dateRangeOptions));

      // We compute the scenario options
      const scenarioOptions = scenarios.map(scenario => ({
        label: { [scenario]: scenario, rcp45: 'Pessimistic', rcp85: 'Optimistic' }[scenario],
        value: scenario
      }));

      dispatch(setScenarioOptions(scenarioOptions));
    });

    return promise;
  };
}

export function getChartData() {
  return (dispatch, getState) => {
    dispatch({
      type: NEXGDDP_SET_CHART_LOADED,
      payload: false
    });

    dispatch({
      type: NEXGDDP_SET_CHART_ERROR,
      payload: false
    });

    const store = getState().nexgddptool;
    const lat = store.marker[0];
    const lng = store.marker[1];

    return fetch(`${process.env.RW_API_URL}/query?sql=select tasavg_q25 as q25, tasavg as q50, tasavg_q75 as q75, year as date from test_decadal_tasavg&lat=${lat}&lon=${lng}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Unable to fetch the data of the chart');
      })
      .then(json => json.data)
      .then(data => dispatch({
        type: NEXGDDP_SET_CHART_DATA,
        payload: data
      }))
      .catch((err) => {
        console.error(err);

        dispatch({
          type: NEXGDDP_SET_CHART_ERROR,
          payload: true
        });
      })
      .then(() => dispatch({
        type: NEXGDDP_SET_CHART_LOADED,
        payload: true
      }));
  };
}
