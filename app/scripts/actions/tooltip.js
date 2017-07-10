import {
  SET_TOOLTIP
} from '../constants';

export default function () {}

export function setTooltip(tooltip) {
  return {
    type: SET_TOOLTIP,
    payload: tooltip
  };
}
