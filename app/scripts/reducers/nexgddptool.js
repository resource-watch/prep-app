import {
  NEXGDDP_SET_MAP_ZOOM,
  NEXGDDP_SET_MAP_CENTER,
  NEXGDDP_SET_MARKER_MODE,
  NEXGDDP_SET_MARKER_POSITION,
  NEXGDDP_SET_MAP_MODE,
  NEXGDDP_SET_GRAPH_MODE,
  NEXGDDP_SET_SCENARIO_OPTIONS,
  NEXGDDP_SET_SCENARIO_SELECTION,
  NEXGDDP_SET_TEMP_RESOLUTION_OPTIONS,
  NEXGDDP_SET_TEMP_RESOLUTION_SELECTION,
  NEXGDDP_SET_RANGE1_OPTIONS,
  NEXGDDP_SET_RANGE1_SELECTION,
  NEXGDDP_SET_RANGE2_OPTIONS,
  NEXGDDP_SET_RANGE2_SELECTION,
  NEXGDDP_SET_CHART_DATA,
  NEXGDDP_SET_CHART_ERROR,
  NEXGDDP_SET_CHART_LOADED,
  NEXGDDP_SET_BASEMAP,
  NEXGDDP_SET_LABELS,
  NEXGDDP_SET_BOUNDARIES,
  NEXGDDP_SET_DATASET,
  NEXGDDP_SET_INDICATOR_DATASET,
  NEXGDDP_RESET_STATE
} from '../constants';

const initialState = {
  // State of the map
  map: {
    zoom: 3,
    center: [20, -30],
    /** @type {'default'|'dark'|'light'|'satellite'|'terrain'} basemap */
    basemap: 'default',
    /** @type {'none'|'dark'|'light'} labels */
    labels: 'none',
    boundaries: true
  },
  // Dataset loaded in the dataset page
  /** @type {object} dataset */
  dataset: null,
  // Dataset defined by indicator, scenario and
  // temporal resolution)
  /** @type {object} indicatorDataset */
  indicatorDataset: null,
  // Position of the marker
  /** @type {[number, number]} marker */
  marker: undefined,
  /** @type {boolean} marker */
  markerMode: false,
  // Mode of the map
  /** @type {'difference'|'side-by-side'|'toggle'} mapMode */
  mapMode: 'side-by-side',
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
  // Resolution temporal used by the dates selectors
  tempResolution: {
    /** @type {{ label: string, value: string }[]} options */
    options: [],
    /** @type {{ label: string, value: string }} selection */
    selection: undefined
  },
  // Range for the visualization
  range1: {
    /** @type {{ [tempResolution: string]: { label: string, value: string }[] }} options */
    options: {},
    /** @type {{ label: string, value: string }} selection */
    selection: undefined
  },
  // Comparison range for the visualization
  range2: {
    /** @type {{ [tempResolution: string]: { label: string, value: string }[] }} options */
    options: {},
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

    case NEXGDDP_SET_MAP_CENTER: {
      return Object.assign({}, state, {
        map: Object.assign({}, state.map, { center: action.payload })
      });
    }

    case NEXGDDP_SET_MARKER_MODE: {
      return Object.assign({}, state, { markerMode: action.payload });
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

    case NEXGDDP_SET_TEMP_RESOLUTION_OPTIONS: {
      return Object.assign({}, state, {
        tempResolution: Object.assign({}, state.tempResolution, { options: action.payload })
      });
    }

    case NEXGDDP_SET_TEMP_RESOLUTION_SELECTION: {
      return Object.assign({}, state, {
        tempResolution: Object.assign({}, state.tempResolution, { selection: action.payload })
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

    case NEXGDDP_SET_BASEMAP: {
      return Object.assign({}, state, {
        map: Object.assign({}, state.map, { basemap: action.payload })
      });
    }

    case NEXGDDP_SET_LABELS: {
      return Object.assign({}, state, {
        map: Object.assign({}, state.map, { labels: action.payload })
      });
    }

    case NEXGDDP_SET_BOUNDARIES: {
      return Object.assign({}, state, {
        map: Object.assign({}, state.map, { boundaries: action.payload })
      });
    }

    case NEXGDDP_SET_INDICATOR_DATASET: {
      return Object.assign({}, state, { indicatorDataset: action.payload });
    }

    case NEXGDDP_SET_DATASET: {
      return Object.assign({}, state, { dataset: action.payload });
    }

    case NEXGDDP_RESET_STATE: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
