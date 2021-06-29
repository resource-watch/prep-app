import metadata from '../../metadata.json';

export const getDatasetDefaultEditableWidget = (dataset) => dataset.widget.find(w => w.defaultEditableWidget === true);

export const getData = (key, value) => {
  let data = null;
  for (let i = metadata.length - 1; i >= 0; i--) {
    if (value.indexOf(metadata[i][key]) > -1) {
      data = metadata[i];
      break;
    }
  }
  return data;
};

export const getDownloadUrl = (data) => {
  let url = null;
  let metadataUrl = null;

  if (data.metadata && data.metadata.length &&
      data.metadata[0].info.data_download) {
    metadataUrl = data.metadata[0].info.data_download;
  }
  switch (data.provider) {
    case 'cartodb':
      if (data && data.connectorUrl && data.connectorUrl.indexOf('tables') === -1) {
        const uri = new URL(data.connectorUrl);
        uri.search({ format: 'csv' });
        url = uri.toString();
      } else {
        url = data.connectorUrl;
      }
      break;
    default:
      url = metadataUrl;
  }
  return url;
}

export default { getData, getDownloadUrl, getDatasetDefaultEditableWidget };
