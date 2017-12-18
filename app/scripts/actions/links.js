import 'whatwg-fetch';
import * as queryString from 'query-string';
import { push } from 'react-router-redux';
import { LINK_SHORTEN_RECEIVE, LINK_SHORTEN_ERROR } from '../constants';

export default function () {}

export function updateURL() {
  return (dispatch, state) => {
    const params = state().exploremap;
    const activeDatasets = state().datasets.list.filter(layer => layer.active);
    const { filters } = state().datasets;
    const { location } = state().coreDatasetsFilter;
    let filtersFlatten = [];

    (Object.keys(filters) || []).forEach((key) => {
      filtersFlatten = filtersFlatten.concat(filters[key]);
    });

    const url = `${params.latLng.lat}/${params.latLng.lng}/${params.zoom}`;

    const queryParams = queryString.stringify({
      activeDatasets: activeDatasets.map(d => d.id).join(','),
      activeFilters: filtersFlatten.join(','),
      coreDatasetsLocation: location
    });

    dispatch(push(`/explore/${url}?${queryParams}`));
  };
}

export function getShortLink(longUrl) {
  return (dispatch) => {
    const url = encodeURIComponent(longUrl);
    fetch(`/short?url=${url}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
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
