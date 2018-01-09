import L from 'leaflet';

export default (leafletMap, layerSpec) => {
  const { layerConfig, zIndex, opacity } = layerSpec;

  // Transforming layerSpec
  const bodyStringified = JSON.stringify(layerConfig.body || {})
    .replace(/"cartocss-version":/g, '"cartocss_version":')
    .replace(/"geom-column"/g, '"geom_column"')
    .replace(/"geom-type"/g, '"geom_type"')
    .replace(/"raster-band"/g, '"raster_band"');

  const request = new Request(`https://${layerConfig.account}.carto.com/api/v1/map`, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: bodyStringified
  });

  return new Promise((resolve, reject) => {
    fetch(request)
      .then((res) => {
        if (!res.ok) {
          reject(res);
        }
        return res.json();
      })
      .then((data) => {
        const tileUrl = `${data.cdn_url.templates.https.url}/${layerConfig.account}/api/v1/map/${data.layergroupid}/{z}/{x}/{y}.png`;
        const layer = L.tileLayer(tileUrl);
        layer.setZIndex(zIndex);
        layer.setOpacity(opacity);

        layer.on('tileload', () => resolve(layer));
        layer.on('tileerror', err => reject(err));

        // adding map
        leafletMap.addLayer(layer);
      })
      .catch(err => reject(err));
  });
};
