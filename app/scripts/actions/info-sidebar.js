import {
  SET_INFO_SIDEBAR_METADATA
} from '../constants';

export default function () {}

export function setInfoSidebarMetadata(open, datasetId) {
  return {
    type: SET_INFO_SIDEBAR_METADATA,
    payload: { open, datasetId }
  };
}
