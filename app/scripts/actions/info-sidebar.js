import {
  SET_INFO_SIDEBAR_METADATA
} from '../constants';

export default function () {}

export function setInfoSidebarMetadata(open, datasetSlug) {
  return {
    type: SET_INFO_SIDEBAR_METADATA,
    payload: { open, datasetSlug }
  };
}
