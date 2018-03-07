import L from 'leaflet';
import qs from 'query-string';
import Promise from 'bluebird';
import { wriAPISerializer } from 'helpers/wri-api-serializer';
import { getInfo } from 'components/dataset-card/dataset-helper';

Promise.config({
  cancellation: true
});

export default (leafletMap, layerSpec) => {
  const { id, layerIndex, opacity, visibility, period } = layerSpec;

  const year = (period || {}).value || '1971';

  const tileUrl = `${config.apiUrlRW}/layer/${id}/tile/loca/{z}/{x}/{y}?year=${year}`;

  const layer = L.tileLayer(tileUrl);

  layer.setZIndex(layerIndex);

  // If visibility is enabled, set opacity to zero
  if (visibility) {
    layer.setOpacity(opacity);
  } else {
    layer.setOpacity(0);
  }

  // adding map
  // leafletMap.addLayer(layer);

  return new Promise((resolve, reject) => {
    if (layer) return resolve(layer);
    return reject();

    // layer.on('tileload', () => resolve(layer));
    // layer.on('tileerror', err => reject(err));

    // // removing layer before resolve
    // onCancel(() => leafletMap.removeLayer(layer));
  });
};
