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
  NEXGDDP_SET_RANGE2_SELECTION
} from '../constants';

export function setMapZoom(zoom) {
  return {
    type: NEXGDDP_SET_MAP_ZOOM,
    payload: zoom
  };
}

export function setMapCenter(center) {
  return {
    type: NEXGDDP_SET_MAP_CENTER,
    payload: center
  };
}

export function setMarkerPosition(coordinates) {
  return {
    type: NEXGDDP_SET_MARKER_POSITION,
    payload: coordinates
  };
}

export function setMapMode(mapMode) {
  return {
    type: NEXGDDP_SET_MAP_MODE,
    payload: mapMode
  };
}

export function setGraphMode(graphMode) {
  return {
    type: NEXGDDP_SET_GRAPH_MODE,
    payload: graphMode
  };
}

export function setScenarioOptions(options) {
  return {
    type: NEXGDDP_SET_SCENARIO_OPTIONS,
    payload: options
  };
}

export function setScenarioSelection(selection) {
  return {
    type: NEXGDDP_SET_SCENARIO_SELECTION,
    payload: selection
  };
}

export function setRange1Options(options) {
  return {
    type: NEXGDDP_SET_RANGE1_OPTIONS,
    payload: options
  };
}

export function setRange1Selection(selection) {
  return {
    type: NEXGDDP_SET_RANGE1_SELECTION,
    payload: selection
  };
}

export function setRange2Options(options) {
  return {
    type: NEXGDDP_SET_RANGE2_OPTIONS,
    payload: options
  };
}

export function setRange2Selection(selection) {
  return {
    type: NEXGDDP_SET_RANGE2_SELECTION,
    payload: selection
  };
}

export function getSelectorsInfo() {
  return (dispatch) => {
    // Temporary code
    const promise = Promise.resolve(fieldsMock);

    promise.then(({ meta }) => {
      const date = meta.coverageBounds.Date;
      const scenarios = meta.coverageBounds.Scenarios;

      // We compute the date range options
      const startYear = new Date(date[0]).getFullYear();
      const endYear = new Date(date[1]).getFullYear();
      let yearPointer = startYear;
      const dateRangeOptions = [];

      while (yearPointer + 10 <= endYear) {
        dateRangeOptions.push({
          label: `${yearPointer}-${yearPointer + 10}`,
          value: `${yearPointer}`
        });
        yearPointer += 10;
      }

      dispatch(setRange1Options(dateRangeOptions));
      dispatch(setRange1Selection(dateRangeOptions[0]));
      dispatch(setRange2Options(dateRangeOptions));

      // We compute the scenario options
      const scenarioOptions = scenarios.map(scenario => ({
        label: { [scenario]: scenario, rcp45: 'Pessimistic', rcp85: 'Optimistic' }[scenario],
        value: scenario
      }));

      dispatch(setScenarioOptions(scenarioOptions));
      dispatch(setScenarioSelection(scenarioOptions[0]));
    });
  };
}
