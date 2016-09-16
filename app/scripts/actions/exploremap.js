import {
  MAP_DATA_CHANGED,
  TOGGLE_LAYER_STATUS,
  SET_LAYER_STATUS,
  MAP_LAYERS_ORDER_CHANGED,
  MAP_LAYER_OPACITY_CHANGED,
  MAP_DATASET_ID_SELECTED,
  MAP_GEODATA_RECEIVED,
  MAP_GEOPOSITION_SET
} from '../constants';

export function updateMapParams(params) {
  return {
    type: MAP_DATA_CHANGED,
    payload: params
  };
}

export function switchChange(id) {
  return {
    type: TOGGLE_LAYER_STATUS,
    payload: id
  };
}

export function setSwitchStatus(id, status) {
  return {
    type: SET_LAYER_STATUS,
    payload: { id, status }
  };
}

export function setLayersOrder(layers) {
  return {
    type: MAP_LAYERS_ORDER_CHANGED,
    payload: layers
  };
}

export function toggleLayerOpacity(layerId) {
  return {
    type: MAP_LAYER_OPACITY_CHANGED,
    payload: layerId
  };
}

export function setDatasetSelected(datasetId) {
  return {
    type: MAP_DATASET_ID_SELECTED,
    payload: datasetId
  };
}

export function setInteractionPosition(position) {
  return {
    type: MAP_GEOPOSITION_SET,
    payload: position
  };
}

export function getGeoDataInfo(datasetId, geo) {
  return (dispatch, state) => {
    const datasetsList = state().datasets.list;
    let datasetTableName;
    for (let i = 0, dLength = datasetsList.length; i < dLength; i++) {
      if (datasetId === datasetsList[i].id) {
        datasetTableName = datasetsList[i].table_name;
        break;
      }
    }
    const geoString = JSON.stringify(geo);

    fetch(`${config.apiUrlRW}/query/${datasetId}?sql=SELECT * FROM ${datasetTableName} WHERE ST_INTERSECTS(ST_SetSRID(ST_GeomFromGeoJSON('${geoString}'), 4326), the_geom)`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then(data => {
        dispatch({
          type: MAP_GEODATA_RECEIVED,
          payload: data
        });
      });
  };
}
