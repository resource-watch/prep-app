import { SET_MODAL_UNDER_DEVELOP, SET_MODAL_SHARE } from '../constants';

export function setModalUnderDevelop(status) {
  return {
    type: SET_MODAL_UNDER_DEVELOP,
    payload: status
  };
}
export function setModalShare(status) {
  return {
    type: SET_MODAL_SHARE,
    payload: status
  };
}
