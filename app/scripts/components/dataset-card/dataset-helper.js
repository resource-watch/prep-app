export const getMetadata = dataset => (dataset.metadata && dataset.metadata.length ?
  dataset.metadata[0] || {} : {});

export const getInfo = (dataset) => {
  const metadata = getMetadata(dataset);
  return metadata ? metadata.info || {} : {};
};

export const getTitle = (dataset) => {
  const metadata = getMetadata(dataset);
  const info = getInfo(dataset);
  return metadata.name || info.title || dataset.name;
};

export const getSummary = (dataset) => {
  const info = getInfo(dataset);
  return info.function;
};

export const getDescription = (dataset) => {
  const metadata = getMetadata(dataset);
  return metadata.description;
};

function getDownloadUrl(data) {
  let url = null;
  let metadataUrl = null;
  if (data.metadata && data.metadata.length &&
    data.metadata[0].attributes.info.dataDownload) {
    metadataUrl = data.metadata[0].attributes.info.dataDownload;
  }
  switch (data.provider) {
    case 'cartodb':
      if (data && data.connectorUrl && data.connectorUrl.indexOf('tables') === -1) {
        const uri = new URI(data.connectorUrl);
        uri.search({ format: 'csv' });
        url = uri.toString();
      } else {
        url = data.connectorUrl;
      }
      break;
    default:
      url = metadataUrl || data.connectorUrl;
  }
  return url;
}
