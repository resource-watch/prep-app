import L from 'leaflet';

export default (leafletMap, layerSpec) => {
  const { id, zIndex, opacity } = layerSpec;
  const tileUrl = `${config.apiUrlRW}/layer/${id}/tile/nexgddp/{z}/{x}/{y}`;
  const layer = L.tileLayer(tileUrl);

  layer.setZIndex(zIndex);
  layer.setOpacity(opacity);

  // adding map
  leafletMap.addLayer(layer);

  return new Promise((resolve, reject) => {
    layer.on('tileload', () => resolve(layer));
    layer.on('tileerror', err => reject(err));
  });
};
