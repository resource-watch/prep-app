import L from 'leaflet';
import 'esri-leaflet';
import leafletLayer from './leaflet-layer';

export default (leafletMap, layerSpec) => {
  const { layerConfig, layerIndex, opacity } = layerSpec;

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

    if (layer) {
      layer.on('load', () => {
        const layerElement = leafletMap.getPane('tilePane').lastChild;
        layerElement.style.zIndex = layerIndex;
        layerElement.style.opacity = opacity;
        layerElement.id = layer.id;

        resolve(layer);
      });

      layer.on('requesterror', err => reject(err));

      // adding map
      leafletMap.addLayer(layer);
    } else {
      reject();
    }

    return layer;
  });
};
