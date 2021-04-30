import 'whatwg-fetch';
import * as queryString from 'query-string';
import { replace } from 'react-router-redux';
import { LINK_SHORTEN_RECEIVE, LINK_SHORTEN_ERROR } from '../constants';

export default function () {}

export function updateURL() {
  return (dispatch, getState) => {
    const params = getState().exploremap;
    // keep this until we get rid of the first option.
    const activeDatasets = getState().datasets.list.filter(layer => layer.active) || getState().datasets.activeDatasets;
    const { filters } = getState().exploreDatasetFilter;
    const { location } = getState().coreDatasetsFilter;
    const filterParams = {};
    const url = `${params.latLng.lat}/${params.latLng.lng}/${params.zoom}`;

    (Object.keys(filters) || []).forEach((key) => {
      Object.assign(filterParams, { [key]: filters[key].join(',') });
    });

    const queryParams = queryString.stringify(
      Object.assign({},
        filterParams,
        {
          activeDatasets: activeDatasets.map(d => d.id).join(','),
          coreDatasetsLocation: location
        })
    );

    dispatch(replace(`/explore/${url}?${queryParams}`));
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
