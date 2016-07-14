import { SET_MODAL_UNDER_DEVELOP } from '../constants';

export function setModalUnderDevelop(status) {
  return {
    type: SET_MODAL_UNDER_DEVELOP,
    payload: status
  };
}
