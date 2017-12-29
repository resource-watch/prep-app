export const getMetadata = dataset => dataset.metadata && dataset.metadata.length ?
  dataset.metadata[0] || {} : {};

export const getInfo = dataset => {
  const metadata = getMetadata(dataset);
  return metadata ? metadata.info || {} : {};
};

export const getTitle = dataset => {
  const metadata = getMetadata(dataset);
  const info = getInfo(dataset);
  return metadata.name || info.title || dataset.name;
};