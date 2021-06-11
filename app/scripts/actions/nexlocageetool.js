import { replace } from 'react-router-redux';
import { getIndicatorId } from 'selectors/nexlocageetool';
import {
  NEXLOCAGEE_SET_MAP_ZOOM,
  NEXLOCAGEE_SET_MAP_CENTER,
  NEXLOCAGEE_SET_MARKER_MODE,
  NEXLOCAGEE_SET_MARKER_POSITION,
  NEXLOCAGEE_SET_MAP_MODE,
  NEXLOCAGEE_SET_GRAPH_MODE,
  NEXLOCAGEE_SET_SCENARIO_OPTIONS,
  NEXLOCAGEE_SET_SCENARIO_SELECTION,
  NEXLOCAGEE_SET_TEMP_RESOLUTION_OPTIONS,
  NEXLOCAGEE_SET_TEMP_RESOLUTION_SELECTION,
  NEXLOCAGEE_SET_RANGE1_OPTIONS,
  NEXLOCAGEE_SET_RANGE1_SELECTION,
  NEXLOCAGEE_SET_RANGE2_OPTIONS,
  NEXLOCAGEE_SET_RANGE2_SELECTION,
  NEXLOCAGEE_SET_CHART_DATA,
  NEXLOCAGEE_SET_CHART_LOADED,
  NEXLOCAGEE_SET_CHART_ERROR,
  NEXLOCAGEE_SET_BASEMAP,
  NEXLOCAGEE_SET_LABELS,
  NEXLOCAGEE_SET_WATER,
  NEXLOCAGEE_SET_BOUNDARIES,
  NEXLOCAGEE_SET_RENDER,
  NEXLOCAGEE_SET_DATASET,
  NEXLOCAGEE_SET_INDICATOR_DATASET,
  NEXLOCAGEE_RESET_STATE
} from '../constants';

export function updateUrl() {
  return (dispatch, getState) => {
    const state = getState().nexlocageetool;
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
        window.location.pathname
      );

    dispatch(replace(url));
  };
}

export function setIndicatorDataset(dataset) {
  return dispatch => dispatch({
    type: NEXLOCAGEE_SET_INDICATOR_DATASET,
    payload: dataset
  });
}

export function resetChartData() {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_CHART_LOADED,
      payload: false
    });

    dispatch({
      type: NEXLOCAGEE_SET_CHART_ERROR,
      payload: false
    });

    dispatch({
      type: NEXLOCAGEE_SET_CHART_DATA,
      payload: []
    });
  };
}

export function setMapZoom(zoom, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_MAP_ZOOM,
      payload: zoom
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setMapCenter(center, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_MAP_CENTER,
      payload: center
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setMarkerMode(mode) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_MARKER_MODE,
      payload: mode
    });
  };
}

export function getChartData() {
  return (dispatch, getState) => {
    dispatch({
      type: NEXLOCAGEE_SET_CHART_LOADED,
      payload: false
    });

    dispatch({
      type: NEXLOCAGEE_SET_CHART_ERROR,
      payload: false
    });

    const state = getState();
    const { id, tableName } = state.datasetPage.data;
    const { marker, scenario } = state.nexlocageetool;
    const scenarioMap = { '4.5': 'low', '8.5': 'high' };
    const detectScenario = (value) => scenario.selection && scenarioMap[value] === scenario.selection.value;
    const lat = marker[0];
    const lng = marker[1];
    const query = `select avg(q25), avg(q50), avg(q75), system:index, RCP, year_start, year_end from '${tableName}' where (ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON('{"type":"Point","coordinates":[${lng},${lat}]}'),4326),the_geom)) AND change_vs_absolute like 'abs' GROUP BY system:index, RCP, year_start, year_end`;
    return fetch(`${process.env.RW_API_URL}/query/${id}?sql=${encodeURIComponent(query)}&application=prep`, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Unable to fetch the data of the chart');
      })
      .then(json => json.data)
      .then(data => {
        const payload = data.filter((d) => detectScenario(d.RCP))
          .map((d) => ({ ...d, x: Number(d.year_start) + 15 }));
        dispatch({
          type: NEXLOCAGEE_SET_CHART_DATA,
          // TO-DO: no years from data
          payload,
        })
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: NEXLOCAGEE_SET_CHART_ERROR,
          payload: true
        });
      })
      .then(() => dispatch({
        type: NEXLOCAGEE_SET_CHART_LOADED,
        payload: true
      }));
  };
}

export function setMarkerPosition(coordinates, changeUrl = true) {
  return (dispatch, getState) => {
    dispatch({
      type: NEXLOCAGEE_SET_MARKER_POSITION,
      payload: coordinates
    });

    if (changeUrl) dispatch(updateUrl());

    // We load the data of the chart for this
    // location
    if (getState().nexlocageetool.indicatorDataset && getState().nexlocageetool.marker) {
      dispatch(getChartData());
    }
  };
}

export function setMapMode(mapMode, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_MAP_MODE,
      payload: mapMode
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setGraphMode(graphMode, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_GRAPH_MODE,
      payload: graphMode
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setScenarioOptions(options) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_SCENARIO_OPTIONS,
      payload: options
    });
  };
}

export function loadIndicatorDataset() {
  return (dispatch, getState) => {
    const state = getState();
    const indicatorId = getIndicatorId(state);
    const scenario = state.nexlocageetool.scenario.selection.value;
    const tempResolution = state.nexlocageetool.tempResolution.selection;

    return fetch(`${process.env.RW_API_URL}/nexgddp/dataset/${indicatorId}/${scenario}/${tempResolution.value}?env=${config.datasetEnv}`, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
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

        if (state.nexlocageetool.marker) {
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
      type: NEXLOCAGEE_SET_SCENARIO_SELECTION,
      payload: selection
    });

    if (getState().nexlocageetool.tempResolution.selection) {
      dispatch(loadIndicatorDataset());
    }

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setTempResolutionOptions(options) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_TEMP_RESOLUTION_OPTIONS,
      payload: options
    });
  };
}

export function setTempResolutionSelection(selection, changeUrl = true) {
  return (dispatch, getState) => {
    // We set the selection
    dispatch({
      type: NEXLOCAGEE_SET_TEMP_RESOLUTION_SELECTION,
      payload: selection
    });

    dispatch(loadIndicatorDataset());

    // We need to reset the date selectors too
    const range1Options = getState().nexlocageetool.range1.options;
    const currentYear = (new Date()).getUTCFullYear();
    const selectedOption = range1Options[selection.value]
      .find(option => currentYear >= option.label.split('-')[0]
        && currentYear <= option.label.split('-')[1]);
    dispatch({
      type: NEXLOCAGEE_SET_RANGE1_SELECTION,
      payload: selectedOption || range1Options[selection.value][0]
    });

    dispatch({
      type: NEXLOCAGEE_SET_RANGE2_SELECTION,
      payload: null
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setRange1Options(options) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_RANGE1_OPTIONS,
      payload: options
    });
  };
}

export function setRange1Selection(selection, changeUrl = true) {
  return (dispatch, getState) => {
    // We set the selection
    dispatch({
      type: NEXLOCAGEE_SET_RANGE1_SELECTION,
      payload: selection
    });

    // If the selection is the same as the one of the
    // second range selector, we reset it
    const range2Selection = getState().nexlocageetool.range2.selection;
    if (range2Selection && selection.value === range2Selection.value) {
      dispatch({
        type: NEXLOCAGEE_SET_RANGE2_SELECTION,
        payload: null
      });
    }

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setRange2Options(options) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_RANGE2_OPTIONS,
      payload: options
    });
  };
}

export function setRange2Selection(selection, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_RANGE2_SELECTION,
      payload: selection
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setBasemap(basemap, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_BASEMAP,
      payload: basemap
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setLabels(labels, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_LABELS,
      payload: labels
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setWater(water, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_WATER,
      payload: water
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setBoundaries(boundaries, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_BOUNDARIES,
      payload: boundaries
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function setRender(render, changeUrl = true) {
  return (dispatch) => {
    dispatch({
      type: NEXLOCAGEE_SET_RENDER,
      payload: render
    });

    if (changeUrl) dispatch(updateUrl());
  };
}

export function getUrlState() {
  return (dispatch, getState) => {
    const params = window.location.search
      .substring(1, window.location.search.length)
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
      const scenarioOptions = getState().nexlocageetool.scenario.options;
      const scenarioOption = scenarioOptions.find(s => s.value === params.scenario);
      if (scenarioOption) {
        promises.push(dispatch(setScenarioSelection(scenarioOption, false)));
      }
    }
    if (params.range1) {
      const range1Options = getState().nexlocageetool.range1.options;
      const range1Option = range1Options.find(s => s.value === new Date(params.range1).getFullYear());
      if (range1Option) {
        promises.push(dispatch(setRange1Selection(range1Option, false)));
      }
    }

    if (params.range2) {
      const range2Options = getState().nexlocageetool.range1.options;
      const range2Option = range2Options.find(s => s.value === new Date(params.range2).getFullYear());
      if (range2Option) {
        promises.push(dispatch(setRange1Selection(range2Option, false)));
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

    // We keep the promises so we wait for the state to be set
    // before moving on to something else
    const promises = [];

    // NOTE: do not change the order of the three dispatchs without
    // testing this function
    // setTempResolutionSelection will execute loadIndicatorDataset

    if (!store.nexlocageetool.scenario.selection && store.nexlocageetool.scenario.options.length) {
      promises.push(dispatch(setScenarioSelection(store.nexlocageetool.scenario.options[0])));
    }

    const { options, selection } = store.nexlocageetool.range1;
    if (!selection && Object.keys(options).length) {
      if (options && options.length) {
        const currentYear = (new Date()).getUTCFullYear();
        const selectedOption = options.find(option => currentYear >= (option.value - 15)
          && currentYear <= (option.value + 15));
        const range1Promise = dispatch(setRange1Selection(selectedOption || options[0]));
        promises.push(range1Promise);
      }
    }

    // Needed to chain the action
    return Promise.all(promises);
  };
}

export function getSelectorsInfo() {
  return (dispatch, getState) => {
    const state = getState();
    const { datasetPage } = state;
    // We keep the promises so we wait for the state to be set
    // before moving on to something else
    const promises = [];

    // We populate the scenario selector
    const scenarioOptions = [{ label: 'Low emissions', value: 'low' }, { label: 'High emissions', value: 'high' }];
    const scenarioPromise = dispatch(setScenarioOptions(scenarioOptions));
    promises.push(scenarioPromise);

    const { data } = datasetPage;
    const { layer: layers } = data;

    const periodsOptions = (layers || []).map(
        ({ layerConfig }) => ({
          label: layerConfig.order.toString(),
          value: layerConfig.order,
        })
      )
      .sort((a, b) => (a.value - b.value));
    const dateRangePromise = Promise.all([
      dispatch(setRange1Options(periodsOptions)),
      dispatch(setRange2Options(periodsOptions))
    ]);
    promises.push(dateRangePromise);

    return Promise.resolve(promises);
  };
}

export function resetState() {
  return dispatch => Promise.resolve(dispatch({ type: NEXLOCAGEE_RESET_STATE }));
}

export function setDataset(dataset) {
  return dispatch => Promise.resolve(dispatch({
    type: NEXLOCAGEE_SET_DATASET,
    payload: dataset
  }));
}
