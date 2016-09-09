import React from 'react';
import URI from 'urijs';

function getDownloadUrl(data) {
  let url = null;
  let metadataUrl = null;
  if (data.metadata && data.metadata.length &&
      data.metadata[0].info.attributes.dataDownload) {
    metadataUrl = data.metadata[0].info.attributes.dataDownload;
  }
  switch(data.provider) {
    case 'wms':
      url = null;
      break;
    case 'cartodb':
      if (data.connector_url.indexOf('tables') === -1) {
        const uri = new URI(data.connector_url);
        uri.search({ format: 'csv' });
        url = uri.toString();
      } else {
        url = data.connector_url;
      }
      break;
    case 'featureservice':
      const uri = new URI(data.connector_url);
      uri.segment('query');
      uri.search({
        where: '1=1',
        returnGeometry: 'true',
        returnDistinctValues: 'false',
        returnIdsOnly: 'false',
        returnCountOnly: 'false',
        outFields: '*',
        f: 'json'
      });
      url = uri.toString();
      break;
    default:
      url = metadataUrl || data.connector_url;
  }
  return url;
}

function MetadataInfo(props) {
  const metadataInfo = props.data.metadata[0].info;
  const downloadUrl = getDownloadUrl(props.data);

  const title = metadataInfo.attributes.message
    ? <li>
      <span>Info: </span>
      <span>{metadataInfo.attributes.message}</span>
    </li>
    : <li>
      <span>Description: </span>
      <span>{props.short
        ? metadataInfo.attributes['short-description']
        : metadataInfo.attributes.description}
      </span>
    </li>;
  return (
    <ul>

      {title}

      {metadataInfo.attributes.organization &&
        <li>
          <span>Organization: </span>
          <span>{metadataInfo.attributes.organization}</span>
        </li>
      }
      {metadataInfo.attributes.license &&
        <li>
          <span>License: </span>
          <span>{metadataInfo.attributes.license}</span>
        </li>
      }
      {metadataInfo.attributes.source &&
        <li>
          <span>Access: </span>
          <span>
            <a href={metadataInfo.attributes.source} target="_blank">
              {metadataInfo.attributes.source}
            </a>
          </span>
        </li>
      }
      {props.download && downloadUrl &&
        <li>
          <span>Download: </span>
          <span>
            <a href={downloadUrl} target="_blank">
              {downloadUrl.length > 120
                ? `${downloadUrl.substring(0, 120)}...`
                : downloadUrl
              }
            </a>
          </span>
        </li>
      }
    </ul>
  );
}

MetadataInfo.propTypes = {
  /**
   * Switch between short and long description
   */
  short: React.PropTypes.bool,
  /**
   * Include the download link if exists
   */
  download: React.PropTypes.bool,
  /**
   * Define the metadata info
   */
  data: React.PropTypes.object.isRequired
};

export default MetadataInfo;
