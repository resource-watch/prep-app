import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';

import { getActiveLayersForMap } from '../explore-map-selector';

const getInteractions = state => state.explorePage.interactions;

export const getLayerIds = createSelector(
  [getActiveLayersForMap],
  (activeLayers) => {
    if (isEmpty(activeLayers)) return null;
    return sortBy(activeLayers, l => -l.zIndex);
  }
);

export const getInteraction = createSelector(
  [getLayerIds, getInteractions],
  (layerIds, interactions) => {
    if (isEmpty(interactions) || !layerIds || !layerIds.length || !interactions[layerIds[0].id]) {
      return null;
    }

    return interactions[layerIds[0].id];
  }
);

export default { getInteraction };
