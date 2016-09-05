import 'whatwg-fetch';
import { LINK_SHORTEN_RECEIVE, LINK_SHORTEN_ERROR } from '../constants';

import { push } from 'react-router-redux';

function sortArrayByIndex(a, b) {
  if (a.index < b.index) return -1;
  if (a.index > b.index) return 1;
  return 0;
}

export function updateURL() {
  return (dispatch, state) => {
    const params = state().exploremap;
    const activeDatasets = state().datasets.list.filter(layer => layer.active);
    const filters = state().datasets.filters;
    let filtersFlatten = [];
    if (Object.keys(filters).length > 0) {
      Object.keys(filters).forEach((key) => {
        filtersFlatten = filtersFlatten.concat(filters[key]);
      });
    }

    const url = `${params.latLng.lat}/${params.latLng.lng}/${params.zoom}`;
    let query = '';
    if (activeDatasets.length) {
      activeDatasets.sort(sortArrayByIndex);
      query = '?activeDatasets=';

      activeDatasets.forEach((layer, index) => {
        if (index > 0) query += ',';
        query += layer.id;
      });
    }

    if (filtersFlatten.length) {
      query += activeDatasets.length ? '&activeFilters=' : '?activeFilters=';

      filtersFlatten.forEach((filter, index) => {
        if (index > 0) query += ',';
        query += filter;
      });
    }

    dispatch(push(`/explore/${url}${query}`));
  };
}

export function getShortLink(longUrl) {
  return dispatch => {
    const url = encodeURIComponent(longUrl);
    fetch(`/short?url=${url}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        if (data.data.url) {
          dispatch({
            type: LINK_SHORTEN_RECEIVE,
            payload: {
              shortUrl: data.data.url,
              longUrl
            }
          });
        } else {
          dispatch({
            type: LINK_SHORTEN_RECEIVE,
            payload: {
              shortUrl: false,
              longUrl
            }
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: LINK_SHORTEN_ERROR,
          payload: {
            error: err.message,
            longUrl
          }
        });
      });
  };
}
