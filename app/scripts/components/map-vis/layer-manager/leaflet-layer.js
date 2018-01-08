import L from 'leaflet';

export default (layerSpec) => {
  const { layerConfig } = layerSpec;
  let layer;

  // Transforming data layer
  // TODO: improve this
  if (layerConfig.body.crs && L.CRS[layerConfig.body.crs]) {
    layerConfig.body.crs = L.CRS[layerConfig.body.crs.replace(':', '')];
    layerConfig.body.pane = 'tilePane';
  }

  return new Promise((resolve, reject) => {
    switch (layerConfig.type) {
      case 'wms':
        layer = L.tileLayer.wms(layerConfig.url, layerConfig.body);
        break;
      case 'tileLayer':
        if (JSON.stringify(layerConfig.body).indexOf('style: "function') >= 0) {
          layerConfig.body.style = eval(`(${layerConfig.body.style})`);
        }
        layer = L.tileLayer(layerConfig.url, layerConfig.body);
        break;
      default:
        reject('"type" specified in layer spec doesn`t exist');
    }

    if (layer) resolve(layer);
  });
};
