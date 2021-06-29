import 'whatwg-fetch';
import {
  LAYER_DATA_RECEIVED,
  LAYER_DATA_ERROR
} from '../constants';
import { updateURL } from './links';

export default function () {}

export function getLayerById(layerId) {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_RW_API_URL}/layer/${layerId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: LAYER_DATA_RECEIVED,
          payload: data
        });
      })
      .catch((err) => {
        dispatch({
          type: LAYER_DATA_ERROR,
          payload: {
            id: layerId,
            error: err.message
          }
        });
        dispatch(updateURL());
      });
  };
}
