import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import { PARTNER_TYPES } from './partners-page-constants';

const getPartners = state => state.partners.list;

const allowedTypes = PARTNER_TYPES.map(type => type.value);

export const getFilteredPartners = createSelector(
  [getPartners],
  (partners) => {
    const filteredPartners = partners.filter(partner => allowedTypes.includes(partner.partner_type));
    return groupBy(filteredPartners, 'partner_type');
  }
);

export default { getFilteredPartners };
