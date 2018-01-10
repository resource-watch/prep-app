import L from 'leaflet';
import { wriAPISerializer } from 'helpers/wri-api-serializer';
import { getInfo } from 'components/dataset-card/dataset-helper';

export default (leafletMap, layerSpec) => {
  const { id, dataset, layerIndex, opacity } = layerSpec;
  const request = new Request(`${config.apiUrlRW}/dataset/${dataset}?includes=metadata`);

  return new Promise((resolve, reject) => {
    fetch(request)
      .then((res) => {
        if (!res.ok) {
          reject(res);
        }
        return res.json();
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
        layer.setOpacity(opacity);

        layer.on('tileload', () => resolve(layer));
        layer.on('tileerror', err => reject(err));

        // adding map
        leafletMap.addLayer(layer);
      })
      .catch(err => reject(err));
  });
};
