import * as actions from './nexgddptool-actions';

export const initialState = {
  // Stat of the map
  map: {
    zoom: 3,
    center: [20, -30]
  },
  // Position of the marker
  /** @type {[number, number]} marker */
  marker: undefined,
  // Search input text content
  /** @type {string} search */
  search: undefined,
  // Mode of the map
  /** @type {'difference'|'side_by_side'|'toggle'} mapMode */
  mapMode: 'difference',
  // Mode of the graph
  /** @type {'timeseries'|'seasonal'} */
  graphMode: 'timeseries',
  // List of the scenario options and the current selection
  scenario: {
    options: [
      {
        label: 'RCP45',
        value: 'nex_tasavg_decadal_rcp45'
      },
      {
        label: 'RCP85',
        value: 'nex_tasavg_decadal_rcp85'
      }
    ],
    /** @type {{ label: string, value: string }} selection */
    selection: undefined
  },
  // Range for the visualization
  range1: {
    options: [
      {
        label: '1950 - 1960',
        value: '1950'
      },
      {
        label: '1960 - 1970',
        value: '1960'
      },
      {
        label: '1970 - 1980',
        value: '1970'
      },
      {
        label: '1980 - 1990',
        value: '1980'
      },
      {
        label: '1990 - 2000',
        value: '1990'
      }
    ],
    /** @type {{ label: string, value: string }} selection */
    selection: undefined
  },
  // Comparison range for the visualization
  range2: {
    /** @type {{ label: string, value: string }[]} options */
    options: [],
    /** @type {{ label: string, value: string }} selection */
    selection: undefined
  }
};

export default {
  [actions.setMapZoom]: (state, { payload: zoom }) => ({ ...state, ...{ map: { ...state.map, zoom } } }),
  [actions.setMapCenter]: (state, { payload: center }) => ({ ...state, ...{ map: { ...state.map, center } } }),
  [actions.setMarkerPosition]: (state, { payload: marker }) => ({ ...state, marker }),
  [actions.setSearch]: (state, { payload: search }) => ({ ...state, search }),
  [actions.setMapMode]: (state, { payload: mapMode }) => ({ ...state, mapMode }),
  [actions.setGraphMode]: (state, { payload: graphMode }) => ({ ...state, graphMode }),
  [actions.setScenarioOptions]: (state, { payload: options }) => ({ ...state, ...{ scenario: { ...state.scenario, options } } }),
  [actions.setScenarioSelection]: (state, { payload: selection }) => ({ ...state, ...{ scenario: { ...state.scenario, selection } } }),
  [actions.setRange1Options]: (state, { payload: options }) => ({ ...state, ...{ range1: { ...state.range1, options } } }),
  [actions.setRange1Selection]: (state, { payload: selection }) => ({ ...state, ...{ range1: { ...state.range1, selection } } }),
  [actions.setRange2Options]: (state, { payload: options }) => ({ ...state, ...{ range2: { ...state.range2, options } } }),
  [actions.setRange2Selection]: (state, { payload: selection }) => ({ ...state, ...{ range2: { ...state.range2, selection } } })
};
