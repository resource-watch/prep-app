import 'whatwg-fetch';
import { wriAPISerializer } from 'wri-json-api-serializer';
import {
  DATASET_LIST_RECEIVED,
  DATASET_LIST_RESET,
  DATASET_FETCH_ERROR,
  // DATASET_LAYER_FETCH_ERROR,
  DATASET_WIDGET_RECEIVED,
  DATASET_DETAIL_RECEIVED,
  DATASET_METADATA_RECEIVED,
  DATASET_LAYER_RECEIVED,
  DATASET_SET_FILTER,
  SET_LAYERGROUP_ACTIVE_LAYER,
  CHANGE_TAB,
  TOGGLE_DATASET_ACTIVE
} from '../constants';
import { updateURL } from './links';

export default function () { }

export function changeTab(tab) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_TAB,
      payload: tab
    });
  };
}

export function setDatasetActive(dataset) {
  return (dispatch) => {
    dataset.layer.forEach((l) => {
      const layerData = Object.assign({}, l.attributes, { id: l.id });
      dispatch({
        type: DATASET_LAYER_RECEIVED,
        payload: layerData
      });
    });
  };
}

export function getDatasetLayer(dataset) {
  return (dispatch) => {
    fetch(`${config.apiUrlRW}/layer/${dataset.layer[0].id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Upgrade-Insecure-Requests': 1
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const layerData = wriAPISerializer(data);
        dispatch({
          type: DATASET_LAYER_RECEIVED,
          payload: layerData
        });
      });
  };
}

export function toggleActiveDatasets(dataset) {
  return (dispatch, getState) => {
    const { activeDatasets } = getState().datasets;
    const { id } = dataset;
    let newActiveDatasets = [...activeDatasets];

    if (activeDatasets.includes(id)) {
      newActiveDatasets = activeDatasets.filter(datasetId => datasetId !== id);
    } else {
      newActiveDatasets.push(id);
    }

    dispatch({
      type: TOGGLE_DATASET_ACTIVE,
      payload: newActiveDatasets
    });
  };
}

export function getActiveDatasetLayers(datasets) {
  return (dispatch) => {
    for (let i = 0, dsLength = datasets.length; i < dsLength; i++) {
      if (datasets[i].active) {
        dispatch(setDatasetActive(datasets[i]));
        dispatch(toggleActiveDatasets(datasets[i]));
      }
    }
  };
}

export function setDatasetsTagFilter(filter, tag) {
  return {
    type: DATASET_SET_FILTER,
    payload: {
      filter,
      tag
    }
  };
}

export function getDatasets(defaultActiveLayers) {
  return (dispatch) => {
    const env = config.datasetEnv || 'production';
    fetch(`${config.apiUrlRW}/dataset?application=prep&includes=metadata,layer,vocabulary&page[size]=999&status=saved&env=${env}&published=true`, {
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
        const datasetData = wriAPISerializer(data);

        // Ñapa: We have to keep layer config
        const datasets = (datasetData || []).map((d, i) => Object.assign(d, { layer: data.data[i].attributes.layer }));

        if (datasets.length) {
          for (let i = datasets.length - 1; i >= 0; i--) {
            if (defaultActiveLayers) {
              const index = defaultActiveLayers.indexOf(datasets[i].id);
              if (index > -1) {
                datasets[i].active = true;
                datasets[i].index = index + 1;
                datasets[i].opacity = 1;
              }
            }
          }
        }

        dispatch({
          type: DATASET_LIST_RECEIVED,
          payload: { data: datasets }
        });

        dispatch(getActiveDatasetLayers(datasets));

        dispatch({
          type: DATASET_SET_FILTER,
          payload: {}
        });

        dispatch(updateURL());
      })
      .catch((err) => {
        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}

export function resetDatasetList() {
  return { type: DATASET_LIST_RESET };
}

export function getDatasetByIdOrSlug(datasetIdentifier, includesData) {
  const includes = includesData || [];
  const includeQuery = includes.length > 0 ?
    `&includes=${includes.join(',')}` :
    '';

  return (dispatch) => {
    const env = config.datasetEnv || 'production';
    fetch(`${config.apiUrlRW}/dataset/${datasetIdentifier}?application=prep${includeQuery}&status=saved&page[size]=999&env=${env}`, {
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
        const datasetData = wriAPISerializer(data);
        if (datasetData) {
          dispatch({
            type: DATASET_DETAIL_RECEIVED,
            payload: {
              data: datasetData,
              identifier: datasetIdentifier
            }
          });
          if (datasetData.widget && datasetData.widget.length) {
            dispatch({
              type: DATASET_WIDGET_RECEIVED,
              payload: { data: datasetData.widget[0] }
            });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}

export function getDatasetDefaultWidget(datasetId) {
  return (dispatch) => {
    fetch(`${config.apiUrlRW}/widget?application=prep&default=true&dataset=${datasetId}`, {
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
        if (data.data.length) {
          for (let i = 0, wLength = data.data.length; i < wLength; i++) {
            fetch(`${config.apiUrlRW}/widget/${data.data[i].id}`)
              .then((response) => {
                if (response.ok) return response.json();
                throw new Error(response.statusText);
              })
              .then((widget) => {
                dispatch({
                  type: DATASET_WIDGET_RECEIVED,
                  payload: { data: widget.data }
                });
              });
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}

export function getDatasetMetadata(datasetId) {
  return (dispatch) => {
    fetch(`${config.apiUrlRW}/metadata/${datasetId}`, {
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
        if (data.data[0]) {
          dispatch({
            type: DATASET_METADATA_RECEIVED,
            payload: data.data[0]
          });
        } else {
          dispatch({
            type: DATASET_METADATA_RECEIVED,
            payload: {
              id: datasetId,
              attributes: {
                dataset: datasetId,
                info: {
                  attributes: {
                    title: 'Dataset detail',
                    message: 'There is not metadata for this dataset'
                  }
                }
              }
            }
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: DATASET_FETCH_ERROR,
          payload: err.message
        });
      });
  };
}


export function setLayerGroupActiveLayer(dataset, layer) {
  return (dispatch) => {
    dispatch({
      type: SET_LAYERGROUP_ACTIVE_LAYER,
      payload: { dataset, layer }
    });

    // We also update the URL
    // if (typeof window !== 'undefined') dispatch(setUrlParams());
  };
}
