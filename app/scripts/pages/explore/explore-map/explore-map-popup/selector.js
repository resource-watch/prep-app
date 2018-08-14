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
  (layerIds, _interactions) => {
    if (isEmpty(_interactions) || isEmpty(layerIds)) return null;
    const interactions = Object.values(_interactions).filter(i => i.data);
    return interactions[0] || {};
  }
);

export default { getInteraction };
