import L from 'leaflet';
import qs from 'query-string';
import Promise from 'bluebird';
import { wriAPISerializer } from 'helpers/wri-api-serializer';
import { getInfo } from 'components/dataset-card/dataset-helper';

Promise.config({
  cancellation: true
});

let fetchRequest;

function makeCancellableRequest(url) {
  // Don't use fetch here because xhr have abort, very useful to make a cancelable request
  return new Promise((resolve, reject, onCancel) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => resolve(xhr);
    // Note the onCancel argument only exists if cancellation has been enabled!
    onCancel(() => xhr.abort());
    xhr.send(null);
  });
}

export default (leafletMap, layerSpec) => {
  const { id, dataset, layerIndex, visibility, opacity } = layerSpec;
  const params = {
    application: ['prep'].join(','),
    includes: ['metadata'].join(','),
    'page[size]': 999,
    status: 'saved',
    published: true,
    env: config.datasetEnv || 'production'
  };
  const url = `${config.apiUrlRW}/dataset/${dataset}?${qs.stringify(params)}`;

  return new Promise((resolve, reject, onCancel) => {
    if (fetchRequest) fetchRequest.cancel();
    fetchRequest = makeCancellableRequest(url);
    fetchRequest
      .then((res) => {
        if (res.status !== 200) reject(res);
        return JSON.parse(res.response);
      })
      .then((data) => {
        // TODO: Temporaly forced data to 1971
        const datasetSpec = wriAPISerializer(data);
        const { nexgddp } = getInfo(datasetSpec);
        const year = nexgddp ?
          new Date(nexgddp.date_range[0]).getUTCFullYear().toString() : '';
        const tileUrl = `${config.apiUrlRW}/layer/${id}/tile/nexgddp/{z}/{x}/{y}?year=${year}`;
        const layer = L.tileLayer(tileUrl);

        layer.setZIndex(layerIndex);

        // If visibility is enabled, set opacity to zero
        if (visibility) {
          layer.setOpacity(opacity);
        } else {
          layer.setOpacity(0);
        }

        layer.on('tileload', () => resolve(layer));
        layer.on('tileerror', err => reject(err));

        // adding map
        leafletMap.addLayer(layer);

        // removing layer before resolve
        onCancel(() => leafletMap.removeLayer(layer));
      })
      .catch(err => reject(err));
    onCancel(() => fetchRequest.cancel());
  });
};
