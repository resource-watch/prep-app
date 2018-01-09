import L from 'leaflet';
import 'esri-leaflet';
import leafletLayer from './leaflet-layer';

export default (layerSpec) => {
  const { layerConfig } = layerSpec;

  // Transforming layer
  const bodyStringified = JSON.stringify(layerConfig.body || {})
    .replace(/"mosaic-rule":/g, '"mosaicRule":')
    .replace(/"mosaic_rule":/g, '"mosaicRule":')
    .replace(/"use-cors":/g, '"useCors":')
    .replace(/"use_cors":/g, '"useCors":');

  if (L[layerConfig.type]) return leafletLayer();

  return new Promise((resolve, reject) => {
    const layerOptions = JSON.parse(bodyStringified);

    if (!L.esri[layerConfig.type]) return reject('"type" specified in layer spec doesn`t exist');

    layerOptions.pane = 'tilePane';
    layerOptions.useCors = true; // forcing cors
    if (layerOptions.style &&
      layerOptions.style.indexOf('function') >= 0) {
      layerOptions.style = eval(`(${layerOptions.style})`);
    }

    const layer = L.esri[layerConfig.type](layerOptions);

    if (layer) return resolve(layer);

    return reject();
  });
};
