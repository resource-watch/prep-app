import { createAction } from 'redux-actions';

export const setMapZoom = createAction('setMapZoom');
export const setMapCenter = createAction('setMapCenter');
export const setMarkerPosition = createAction('setMarkerPosition');
export const setSearch = createAction('setSearch');
export const setMapMode = createAction('setMapMode');
export const setGraphMode = createAction('setGraphMode');
export const setScenarioOptions = createAction('setScenarioOptions');
export const setScenarioSelection = createAction('setScenarioSelection');
export const setRange1Options = createAction('setRange1Options');
export const setRange1Selection = createAction('setRange1Selection');
export const setRange2Options = createAction('setRange2Options');
export const setRange2Selection = createAction('setRange2Selection');

export default {
  setMapZoom,
  setMapCenter,
  setMarkerPosition,
  setSearch,
  setMapMode,
  setGraphMode,
  setScenarioOptions,
  setScenarioSelection,
  setRange1Options,
  setRange1Selection,
  setRange2Options,
  setRange2Selection
};
