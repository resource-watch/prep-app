import { createAction } from 'redux-actions';

export const setMapZoom = createAction('nexgddptool/setMapZoom');
export const setMapCenter = createAction('nexgddptool/setMapCenter');
export const setMarkerPosition = createAction('nexgddptool/setMarkerPosition');
export const setSearch = createAction('nexgddptool/setSearch');
export const setMapMode = createAction('nexgddptool/setMapMode');
export const setGraphMode = createAction('nexgddptool/setGraphMode');
export const setScenarioOptions = createAction('nexgddptool/setScenarioOptions');
export const setScenarioSelection = createAction('nexgddptool/setScenarioSelection');
export const setRange1Options = createAction('nexgddptool/setRange1Options');
export const setRange1Selection = createAction('nexgddptool/setRange1Selection');
export const setRange2Options = createAction('nexgddptool/setRange2Options');
export const setRange2Selection = createAction('nexgddptool/setRange2Selection');

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
