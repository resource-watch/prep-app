import { replace } from 'react-router-redux';
import { getIndicatorId, getTempResolution } from 'selectors/locatool';
import {
  LOCA_SET_MAP_ZOOM,
  LOCA_SET_MAP_CENTER,
  LOCA_SET_MARKER_MODE,
  LOCA_SET_MARKER_POSITION,
  LOCA_SET_MAP_MODE,
  LOCA_SET_GRAPH_MODE,
  LOCA_SET_SCENARIO_OPTIONS,
  LOCA_SET_SCENARIO_SELECTION,
  LOCA_SET_TEMP_RESOLUTION_OPTIONS,
  LOCA_SET_TEMP_RESOLUTION_SELECTION,
  LOCA_SET_RANGE1_OPTIONS,
  LOCA_SET_RANGE1_SELECTION,
  LOCA_SET_RANGE2_OPTIONS,
  LOCA_SET_RANGE2_SELECTION,
  LOCA_SET_CHART_DATA,
  LOCA_SET_CHART_LOADED,
  LOCA_SET_CHART_ERROR,
  LOCA_SET_BASEMAP,
  LOCA_SET_LABELS,
  LOCA_SET_WATER,
  LOCA_SET_BOUNDARIES,
  LOCA_SET_RENDER,
  LOCA_SET_DATASET,
  LOCA_SET_INDICATOR_DATASET,
  LOCA_RESET_STATE
} from '../constants';

export function updateUrl() {
  return (dispatch, getState) => {
    const state = getState().locatool;
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
      tempResolution: state.tempResolution.selection
        ? state.tempResolution.selection.value
        : undefined,
      range1: state.range1.selection
        ? state.range1.selection.value
        : undefined,
      range2: state.range2.selection
        ? state.range2.selection.value
        : undefined,
      basemap: state.map.basemap !== 'default'
        ? state.map.basemap
        : undefined,
      labels: state.map.labels !== 'none'
        ? state.map.labels
        : undefined,
      boundaries: !!state.map.boundaries || undefined,
      render: state.render || undefined
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

export function setIndicatorDataset(dataset) {
  return dispatch => dispatch({
    type: LOCA_SET_INDICATOR_DATASET,
    payload: dataset
  });
}

export function resetChartData() {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_CHART_LOADED,
      payload: false
    });

    dispatch({
      type: LOCA_SET_CHART_ERROR,
      payload: false
    });

    dispatch({
      type: LOCA_SET_CHART_DATA,
      payload: []
    });
  };
}

export function setMapZoom(zoom, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_MAP_ZOOM,
      payload: zoom
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setMapCenter(center, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_MAP_CENTER,
      payload: center
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setMarkerMode(mode) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_MARKER_MODE,
      payload: mode
    });
  };
}

export function getChartData() {
  return (dispatch, getState) => {
    dispatch({
      type: LOCA_SET_CHART_LOADED,
      payload: false
    });

    dispatch({
      type: LOCA_SET_CHART_ERROR,
      payload: false
    });

    const state = getState();
    const lat = state.locatool.marker[0];
    const lng = state.locatool.marker[1];
    const indicatorId = getIndicatorId(state);
    const slug = state.locatool.indicatorDataset.slug;

    return fetch(`${process.env.RW_API_URL}/query?sql=select ${indicatorId}_q25 as q25, ${indicatorId} as q50, ${indicatorId}_q75 as q75, year as x from ${slug}&lat=${lat}&lon=${lng}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Unable to fetch the data of the chart');
      })
      .then(json => json.data)
      .then(data => dispatch({
        type: LOCA_SET_CHART_DATA,
        payload: data
      }))
      .catch((err) => {
        console.error(err);

        dispatch({
          type: LOCA_SET_CHART_ERROR,
          payload: true
        });
      })
      .then(() => dispatch({
        type: LOCA_SET_CHART_LOADED,
        payload: true
      }));
  };
}

export function setMarkerPosition(coordinates, changeUrl = true) {
  return (dispatch, getState) => {
    dispatch({
      type: LOCA_SET_MARKER_POSITION,
      payload: coordinates
    });

    if (changeUrl) dispatch(updateUrl());

    // We load the data of the chart for this
    // location
    if (getState().locatool.indicatorDataset && getState().locatool.marker) {
      dispatch(getChartData());
    }
  };
}

export function setMapMode(mapMode, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_MAP_MODE,
      payload: mapMode
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setGraphMode(graphMode, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_GRAPH_MODE,
      payload: graphMode
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setScenarioOptions(options) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_SCENARIO_OPTIONS,
      payload: options
    });
  };
}

export function loadIndicatorDataset() {
  return (dispatch, getState) => {
    const state = getState();
    const indicatorId = getIndicatorId(state);
    const scenario = state.locatool.scenario.selection.value;
    const tempResolution = state.locatool.tempResolution.selection;

    return fetch(`${process.env.RW_API_URL}/loca/dataset/${indicatorId}/${scenario}/${tempResolution.value}?env=${config.datasetEnv}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Unable to fetch the layers');
      })
      .then(({ data }) => {
        // We keep the promises so we wait for the state to be set
        // before moving on to something else
        const promises = [];

        const dataset = Object.assign(
          {},
          data,
          data.attributes,
          { layer: data.attributes.layer.map(l => Object.assign({}, l, l.attributes)) }
        );
        const datasetPromise = dispatch(setIndicatorDataset(dataset));
        promises.push(datasetPromise);

        if (state.locatool.marker) {
          const chartDataPromise = dispatch(getChartData());
          promises.push(chartDataPromise);
        }

        return promises;
      })
      .catch(err => console.error(err));
  };
}

export function setScenarioSelection(selection, changeUrl = true) {
  return (dispatch, getState) => {
    dispatch({
      type: LOCA_SET_SCENARIO_SELECTION,
      payload: selection
    });

    if (getState().locatool.tempResolution.selection) {
      dispatch(loadIndicatorDataset());
    }

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setTempResolutionOptions(options) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_TEMP_RESOLUTION_OPTIONS,
      payload: options
    });
  };
}

export function setTempResolutionSelection(selection, changeUrl = true) {
  return (dispatch, getState) => {
    // We set the selection
    dispatch({
      type: LOCA_SET_TEMP_RESOLUTION_SELECTION,
      payload: selection
    });

    dispatch(loadIndicatorDataset());

    // We need to reset the date selectors too
    const range1Options = getState().locatool.range1.options;
    const currentYear = (new Date()).getUTCFullYear();
    const selectedOption = range1Options[selection.value]
      .find(option => currentYear >= option.label.split('-')[0]
        && currentYear <= option.label.split('-')[1]);
    dispatch({
      type: LOCA_SET_RANGE1_SELECTION,
      payload: selectedOption || range1Options[selection.value][0]
    });

    dispatch({
      type: LOCA_SET_RANGE2_SELECTION,
      payload: undefined
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setRange1Options(options) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_RANGE1_OPTIONS,
      payload: options
    });
  };
}

export function setRange1Selection(selection, changeUrl = true) {
  return (dispatch, getState) => {
    // We set the selection
    dispatch({
      type: LOCA_SET_RANGE1_SELECTION,
      payload: selection
    });

    // If the selection is the same as the one of the
    // second range selector, we reset it
    const range2Selection = getState().locatool.range2.selection;
    if (range2Selection && selection.value === range2Selection.value) {
      dispatch({
        type: LOCA_SET_RANGE2_SELECTION,
        payload: undefined
      });
    }

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setRange2Options(options) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_RANGE2_OPTIONS,
      payload: options
    });
  };
}

export function setRange2Selection(selection, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_RANGE2_SELECTION,
      payload: selection
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setBasemap(basemap, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_BASEMAP,
      payload: basemap
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setLabels(labels, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_LABELS,
      payload: labels
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setWater(water, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_WATER,
      payload: water
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setBoundaries(boundaries, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_BOUNDARIES,
      payload: boundaries
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setRender(render, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: LOCA_SET_RENDER,
      payload: render
    });

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

    // We keep the promises so we wait for the state to be restored
    // before moving on to something else
    const promises = [];

    if (params.zoom) {
      promises.push(dispatch(setMapZoom(+params.zoom, false)));
    }
    if (params.lat && params.lng) {
      promises.push(dispatch(setMapCenter([+params.lat, +params.lng], false)));
    }
    if (params.markerLat && params.markerLng) {
      promises.push(dispatch(setMarkerPosition([+params.markerLat, +params.markerLng], false)));
    }
    if (params.mapMode) {
      promises.push(dispatch(setMapMode(params.mapMode, false)));
    }
    if (params.graphMode) {
      promises.push(dispatch(setGraphMode(params.graphMode, false)));
    }
    if (params.scenario) {
      const scenarioOptions = getState().locatool.scenario.options;
      const scenarioOption = scenarioOptions.find(s => s.value === params.scenario);
      if (scenarioOption) {
        promises.push(dispatch(setScenarioSelection(scenarioOption, false)));
      }
    }
    if (params.tempResolution) {
      const tempResolutionOptions = getState().locatool.tempResolution.options;
      const tempResolutionOption = tempResolutionOptions.find(t => t.value === params.tempResolution);
      if (tempResolutionOption) {
        promises.push(dispatch(setTempResolutionSelection(tempResolutionOption, false)));
      }

      if (params.range1) {
        const range1Options = getState().locatool.range1.options;
        const range1Option = range1Options[tempResolutionOption.value]
          && range1Options[tempResolutionOption.value].find(s => s.value === params.range1);
        if (range1Option) {
          promises.push(dispatch(setRange1Selection(range1Option, false)));
        }
      }

      if (params.range2) {
        const range2Options = getState().locatool.range2.options;
        const range2Option = range2Options[tempResolutionOption.value]
          && range2Options[tempResolutionOption.value].find(s => s.value === params.range2);
        if (range2Option) {
          promises.push(dispatch(setRange2Selection(range2Option, false)));
        }
      }
    }
    if (params.basemap) {
      promises.push(dispatch(setBasemap(params.basemap)));
    }
    if (params.labels) {
      promises.push(dispatch(setLabels(params.labels)));
    }
    if (params.boundaries) {
      promises.push(dispatch(setBoundaries(params.boundaries === 'true')));
    }
    if (params.render) {
      promises.push(dispatch(setRender(params.render)));
    }

    // Needed to chain the action
    return Promise.all(promises);
  };
}

export function setDefaultState() {
  return (dispatch, getState) => {
    const store = getState();
    const tempResolutionValue = getTempResolution(store);

    // We keep the promises so we wait for the state to be set
    // before moving on to something else
    const promises = [];

    // NOTE: do not change the order of the three dispatchs without
    // testing this function
    // setTempResolutionSelection will execute loadIndicatorDataset

    if (!store.locatool.scenario.selection && store.locatool.scenario.options.length) {
      promises.push(dispatch(setScenarioSelection(store.locatool.scenario.options[0])));
    }

    if (!store.locatool.range1.selection && Object.keys(store.locatool.range1.options).length && store.locatool.tempResolution.options.length) {
      const options = store.locatool.range1.options[tempResolutionValue];
      if (options && options.length) {
        const currentYear = (new Date()).getUTCFullYear();
        const selectedOption = options.find(option => currentYear >= option.label.split('-')[0]
          && currentYear <= option.label.split('-')[1]);
        const range1Promise = dispatch(setRange1Selection(selectedOption || options[0]));
        promises.push(range1Promise);
      }
    }

    if (!store.locatool.tempResolution.selection && store.locatool.tempResolution.options.length) {
      const tempResolution = store.locatool.tempResolution.options.find(t => t.value === tempResolutionValue);
      promises.push(dispatch(setTempResolutionSelection(tempResolution || store.locatool.tempResolution.options[0])));
    }

    // Needed to chain the action
    return Promise.all(promises);
  };
}

export function getSelectorsInfo() {
  return (dispatch, getState) => {
    const state = getState();
    const indicatorId = getIndicatorId(state);

    return fetch(`${process.env.RW_API_URL}/loca/info/${indicatorId}`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Unable to fetch the data of the selectors');
      })
      .then(({ scenarios, temporalResolution }) => {
        // We keep the promises so we wait for the state to be set
        // before moving on to something else
        const promises = [];

        // We populate the scenario selector
        const scenarioOptions = scenarios.map(s => ({ label: s.label, value: s.id }));
        const scenarioPromise = dispatch(setScenarioOptions(scenarioOptions));
        promises.push(scenarioPromise);

        // We populate the temporal resoution selector
        const tempResolutionOptions = temporalResolution.map(t => ({ label: t.label, value: t.id }));
        const tempResolutionPromise = dispatch(setTempResolutionOptions(tempResolutionOptions));
        promises.push(tempResolutionPromise);

        // We populate the date range selectors
        const dateRangeOptions = tempResolutionOptions
          .map((tempResolutionOption) => { // eslint-disable-line arrow-body-style
            return {
              [tempResolutionOption.value]: temporalResolution
                .find(t => t.id === tempResolutionOption.value).periods
                .map(d => ({ label: d.label, value: d.id }))
            };
          })
          .reduce((res, options) => Object.assign({}, res, options), {});
        const dateRangePromise = Promise.all([
          dispatch(setRange1Options(dateRangeOptions)),
          dispatch(setRange2Options(dateRangeOptions))
        ]);
        promises.push(dateRangePromise);

        return promises;
      })
      .catch(err => console.error(err));
  };
}

export function resetState() {
  return dispatch => Promise.resolve(dispatch({
    type: LOCA_RESET_STATE
  }));
}

export function setDataset(dataset) {
  return dispatch => Promise.resolve(dispatch({
    type: LOCA_SET_DATASET,
    payload: dataset
  }));
}
