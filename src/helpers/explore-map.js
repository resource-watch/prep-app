const isLayerReady = (layer, layers) => layers && !!layers[layer.id];
const sortLayersByIndex = layers => layers.sort((a, b) => a.index - b.index);

export {
  isLayerReady,
  sortLayersByIndex
};
