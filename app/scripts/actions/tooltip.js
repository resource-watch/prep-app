import {
  SET_TOOLTIP
} from '../constants';

export function setTooltip(tooltip) {
  return {
    type: SET_TOOLTIP,
    payload: tooltip
  };
}
