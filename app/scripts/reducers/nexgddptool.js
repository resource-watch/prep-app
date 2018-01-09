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
  NEXGDDP_SET_CHART_ERROR,
  NEXGDDP_SET_CHART_LOADED,
  NEXGDDP_SET_MAP_LAYERS
} from '../constants';

const initialState = {
  // State of the map
  map: {
    zoom: 3,
    center: [20, -30]
  },
  layers: [],
  // Position of the marker
  /** @type {[number, number]} marker */
  marker: undefined,
  // Mode of the map
  /** @type {'difference'|'side-by-side'|'toggle'} mapMode */
  mapMode: 'difference',
  // Mode of the graph
  /** @type {'timeseries'|'seasonal'} */
  graphMode: 'timeseries',
  // List of the scenario options and the current selection
  scenario: {
    /** @type {{ label: string, value: string }[]} options */
    options: [],
    /** @type {{ label: string, value: string }} selection */
    selection: undefined
  },
  // Range for the visualization
  range1: {
    /** @type {{ label: string, value: string }[]} options */
    options: [],
    /** @type {{ label: string, value: string }} selection */
    selection: undefined
  },
  // Comparison range for the visualization
  range2: {
    /** @type {{ label: string, value: string }[]} options */
    options: [],
    /** @type {{ label: string, value: string }} selection */
    selection: undefined
  },
  // Data of the chart
  chart: {
    /** @type {{ q25: number, q50: number, q75: number, date: string }[]} */
    data: [],
    loaded: false,
    error: false
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEXGDDP_SET_MAP_ZOOM: {
      return Object.assign({}, state, {
        map: Object.assign({}, state.map, { zoom: action.payload })
      });
    }

    case NEXGDDP_SET_MAP_LAYERS: {
      return Object.assign({}, state, {
        map: Object.assign({}, state.layers, { layers: action.payload })
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

    case NEXGDDP_SET_CHART_DATA : {
      return Object.assign({}, state, {
        chart: Object.assign({}, state.chart, { data: action.payload })
      });
    }

    case NEXGDDP_SET_CHART_ERROR : {
      return Object.assign({}, state, {
        chart: Object.assign({}, state.chart, { error: action.payload })
      });
    }

    case NEXGDDP_SET_CHART_LOADED : {
      return Object.assign({}, state, {
        chart: Object.assign({}, state.chart, { loaded: action.payload })
      });
    }

    default: {
      return state;
    }
  }
}
