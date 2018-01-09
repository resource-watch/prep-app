import L from 'leaflet';

export default (layerSpec) => {
  const layerData = Object.assign({}, layerSpec);
  const tileUrl = `${config.apiUrlRW}/layer/${layerData.id}/tile/nexgddp/{z}/{x}/{y}`;
  const tileLayer = L.tileLayer(tileUrl);

  return new Promise(resolve => resolve(tileLayer));

  // const eventName = (layerData.type === 'wms' ||
  // layerData.type === 'tileLayer') ? 'tileload' : 'load';
  // tileLayer.on(eventName, () => {
  //   this.handleTileLoaded(tileLayer);
  // });
  // tileLayer.on('tileerror', () => this.handleTileLoaded(tileLayer));
  // tileLayer.addTo(this.map).setZIndex((datasetsLength + 1) - (dataset.index || 0));
};
