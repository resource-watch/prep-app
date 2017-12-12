import React from 'react';
import URI from 'urijs';
import ReactMarkdown from 'react-markdown';

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

class MetadataInfo extends React.PureComponent {
  render() {
    if (!this.props.data.metadata || !this.props.data.metadata.length) return null;

    const metadata = this.props.data.metadata && this.props.data.metadata[0].attributes;
    const metadataInfo = metadata && metadata.info;
    const downloadUrl = getDownloadUrl(this.props.data);

    if (!metadata || !metadataInfo) return null;

    const description = metadataInfo.message
      ? (<li><span>Info: </span><span>{metadataInfo.message}</span></li>)
      : (<li>
        <span>Description: </span>
        <span>{this.props.short && metadataInfo['short-description']
          ? metadataInfo['short-description']
          : <ReactMarkdown source={metadata.description} className="markdown" />}
        </span>
      </li>);
    const createdAt = new Date(metadata.created_at);

    return (
      <ul>
        {/* Published date */}
        {metadataInfo.pusblished_date &&
          <li><span>Published date: </span><span>{metadataInfo.pusblished_date}</span></li>
        }

        {/* Description */}
        {description}

        {/* Dataset language */}
        <li><span>Dataset Language: </span><span>{metadata.language}</span></li>

        {/* Geographic Location */}
        {metadataInfo.geographic_coverage &&
          <li><span>Geographic location: </span><span>{metadataInfo.geographic_coverage}</span></li>
        }

        {/* Date of content */}
        {metadataInfo.date_of_content &&
          <li><span>Date of content: </span><span>{metadataInfo.date_of_content}</span></li>
        }

        {/* Data type */}
        {metadataInfo.data_type &&
          <li><span>Data type: </span><span>{metadataInfo.data_type}</span></li>
        }

        {/* Spatial resolution */}
        {metadataInfo.spatial_resolution &&
          <li><span>Spatial resolution: </span><span>{metadataInfo.spatial_resolution}</span></li>
        }

        {/* Metadata language */}
        <li><span>Metadata Language: </span><span>{metadata.language}</span></li>

        {/* License */}
        {metadataInfo.license &&
          <li>
            <span>License: </span>
            <ReactMarkdown source={metadataInfo.license} className="markdown -inline" />
          </li>
        }

        {/* License link */}
        {metadataInfo.license_link &&
          <li><span>Link to license: </span><span>{metadataInfo.license_link}</span></li>
        }

        {/* Source organizations */}
        {(metadataInfo.sources || []).length ?
          <li>
            <span>Source organizations: </span>
            <span>
              <ReactMarkdown
                source={metadataInfo.sources.map(s => s['sources-name']).join(', ')}
                className="markdown -inline"
              />
            </span>
          </li> :
          <li>
            <span>Source organizations: </span>
            <span>{metadataInfo['organization-long']} (<ReactMarkdown source={metadataInfo.organization} className="markdown -inline" />)</span>
          </li>
        }

        {/* Learn more link */}
        {metadataInfo.learn_more_link &&
          <li><span>Download from Original Source Link: </span>
            <span>
              <a href={metadataInfo.learn_more_link} target="_blank" rel="noopener noreferrer">{metadataInfo.learn_more_link}</a>
            </span>
          </li>
        }

        {/* Download url */}
        {this.props.download && downloadUrl &&
          <li>
            <span>Download: </span>
            <span>
              <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                {downloadUrl.length > 120
                  ? `${downloadUrl.substring(0, 120)}...`
                  : downloadUrl
                }
              </a>
            </span>
          </li>
        }

        {/* Contact */}
        <li><span>Contact: </span>
          <span>
            <a href="mailto:info@prepdata.org">info@prepdata.org</a>
          </span>
        </li>

        {/* /Metadata date creation */}
        <li>
          <span>Date of creation: </span>
          <span>{`${createdAt.getFullYear()}/${createdAt.getMonth() + 1}/${createdAt.getDate()}`}</span>
        </li>
      </ul>
    );
  }
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

MetadataInfo.deafultProps = {
  data: {}
};

export default MetadataInfo;
