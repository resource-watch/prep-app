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
  NEXGDDP_SET_RANGE2_SELECTION
} from '../constants';

const initialState = {
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
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEXGDDP_SET_MAP_ZOOM: {
      return Object.assign({}, state, {
        map: Object.assign({}, state.map, { zoom: action.payload })
      });
    }

    case NEXGDDP_SET_MAP_CENTER: {
      return Object.assign({}, state, {
        map: Object.assign({}, state.map, { center: action.payload })
      });
    }

    case NEXGDDP_SET_MARKER_POSITION: {
      return Object.assign({}, state, { marker: action.payload });
    }

    case NEXGDDP_SET_MAP_MODE: {
      return Object.assign({}, state, { mapMode: action.payload });
    }

    case NEXGDDP_SET_GRAPH_MODE: {
      return Object.assign({}, state, { graphMode: action.payload });
    }

    case NEXGDDP_SET_SCENARIO_OPTIONS: {
      return Object.assign({}, state, {
        scenario: Object.assign({}, state.scenario, { options: action.payload })
      });
    }

    case NEXGDDP_SET_SCENARIO_SELECTION: {
      return Object.assign({}, state, {
        scenario: Object.assign({}, state.scenario, { selection: action.payload })
      });
    }

    case NEXGDDP_SET_RANGE1_OPTIONS: {
      return Object.assign({}, state, {
        range1: Object.assign({}, state.range1, { options: action.payload })
      });
    }

    case NEXGDDP_SET_RANGE1_SELECTION: {
      return Object.assign({}, state, {
        range1: Object.assign({}, state.range1, { selection: action.payload })
      });
    }

    case NEXGDDP_SET_RANGE2_OPTIONS: {
      return Object.assign({}, state, {
        range2: Object.assign({}, state.range2, { options: action.payload })
      });
    }

    case NEXGDDP_SET_RANGE2_SELECTION: {
      return Object.assign({}, state, {
        range2: Object.assign({}, state.range2, { selection: action.payload })
      });
    }

    default: {
      return state;
    }
  }
}
