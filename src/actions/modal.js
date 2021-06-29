import {
  SET_MODAL_UNDER_DEVELOP,
  SET_MODAL_SHARE,
  SET_MODAL_METADATA
} from '../constants';

export function setModalUnderDevelop(status) {
  return {
    type: SET_MODAL_UNDER_DEVELOP,
    payload: status
  };
}
export function setModalMetadata(open, datasetId) {
  return {
    type: SET_MODAL_METADATA,
    payload: { open, datasetId }
  };
}
export function setModalShare(status) {
  return {
    type: SET_MODAL_SHARE,
    payload: status
  };
}
