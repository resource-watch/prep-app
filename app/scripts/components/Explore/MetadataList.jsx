import React from 'react';
import URI from 'urijs';

function getDownloadUrl(data) {
  let url = null;
  let metadataUrl = null;
  if (data.metadata && data.metadata.length &&
      data.metadata[0].attributes.info.dataDownload) {
    metadataUrl = data.metadata[0].attributes.info.dataDownload;
  }
  switch(data.provider) {
    case 'cartodb':
      if (data.connectorUrl.indexOf('tables') === -1) {
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

function MetadataInfo(props) {
  const metadataInfo = props.data.metadata && props.data.metadata[0].attributes.info;
  const downloadUrl = getDownloadUrl(props.data);

  if (!metadataInfo) return null;

  const title = metadataInfo.message
    ? <li>
      <span>Info: </span>
      <span>{metadataInfo.message}</span>
    </li>
    : <li>
      <span>Description: </span>
      <span>{props.short
        ? metadataInfo['short-description']
        : metadataInfo.description}
      </span>
    </li>;
  return (
    <ul>

      {title}

      {metadataInfo.organization &&
        <li>
          <span>Organization: </span>
          <span>{metadataInfo.organization}</span>
        </li>
      }
      {metadataInfo.license &&
        <li>
          <span>License: </span>
          <span>{metadataInfo.license}</span>
        </li>
      }
      {metadataInfo.source &&
        <li>
          <span>Access: </span>
          <span>
            <a href={metadataInfo.source} target="_blank">
              {metadataInfo.source}
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
