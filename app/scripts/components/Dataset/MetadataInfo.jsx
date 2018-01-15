import React from 'react';
import { getMetadata, getInfo } from 'components/dataset-card/dataset-helper';

function parseDate(dateString) {
  const d = new Date(dateString);
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

const MetadataInfo = ({ dataset }) => {
  const metadata = getMetadata(dataset);
  const info = getInfo(dataset);
  return (
    <ul>
      {(info.published_date && info.published_date !== '') &&
        <li>
          <span>Published date: </span>
          <span>{info.published_date}</span>
        </li>
      }

      {(info.language && info.language !== '') &&
        <li>
          <span>Dataset language: </span>
          <span>{info.language}</span>
        </li>
      }

      {(info.geographic_coverage && info.geographic_coverage !== '') &&
        <li>
          <span>Geographic location: </span>
          <span>{info.geographic_coverage}</span>
        </li>
      }

      {(info.date_of_content && info.date_of_content !== '') &&
        <li>
          <span>Date of content: </span>
          <span>{info.date_of_content}</span>
        </li>
      }

      {(info.data_type && info.data_type !== '') &&
        <li>
          <span>Data type: </span>
          <span>{info.data_type}</span>
        </li>
      }

      {(info.data_type && info.data_type === 'Raster') &&
        <li>
          <span>Spatial resolution: </span>
          <span>{info.spatial_resolution}</span>
        </li>
      }

      {(metadata.citation && metadata.citation !== '') &&
        <li>
          <span>Citation: </span>
          <span>{metadata.citation}</span>
        </li>
      }

      {(info.license && info.license !== '') &&
        <li>
          <span>License: </span>
          {info.license_link && info.license_link !== '' ?
            <a href={info.license_link} target="_blank"><span>{info.license}</span></a> :
            <span>{info.license}</span>}
        </li>
      }

      {(info['organization-long'] && info['organization-long'] !== '') &&
        <li>
          <span>Organization: </span>
          <span>{info['organization-long']}</span>
        </li>
      }

      {(info.learn_more_link && info.learn_more_link !== '') &&
        <li>
          <span>Download from original source link: </span>
          <a href={info.learn_more_link}><span>{info.learn_more_link}</span></a>
        </li>
      }

      {/* Contact */ }
      <li>
        <span>Contact: </span>
        <span>
          <a href="mailto:info@prepdata.org">info@prepdata.org</a>
        </span>
      </li>

      {/* /Metadata date creation */ }
      <li>
        <span>Date of creation: </span>
        <span>{parseDate(metadata.created_at)}</span>
      </li>
    </ul>
  );
};

// class MetadataInfo extends React.PureComponent {
//   render() {
//     info.wri_rw_id
//     info.technical_title
//     name
//     source
//     info.published_date
//     description
//     info.function
//     info.language
//     info.geographic_coverage
//     info.date_of_content
//     info.data_type
//     info.spatial_resolution
//     language
//     info.endpoint
//     info.license
//     info.license_link
//     info.organization - long
//     info.learn_more_link
//     citation

//     if (!this.props.data.metadata || !this.props.data.metadata.length) return null;

//     const metadata = this.props.data.metadata && this.props.data.metadata[0].attributes;
//     const metadataInfo = metadata && metadata.info;
//     const downloadUrl = getDownloadUrl(this.props.data);

//     console.log(this.props.data.metadata);

//     if (!metadata || !metadataInfo) return null;

//     const description = metadataInfo.message
//       ? (<li><span>Info: </span><span>{metadataInfo.message}</span></li>)
//       : (<li>
//         <span>Description: </span>
//         <span>{this.props.short && metadataInfo['short-description']
//           ? metadataInfo['short-description']
//           : <ReactMarkdown source={metadata.description} className="c-markdown" />}
//         </span>
//       </li>);
//     const createdAt = new Date(metadata.created_at);

//     return (
//       <ul>
//         {/* Published date */}
//         {metadataInfo.pusblished_date &&
//           <li><span>Published date: </span><span>{metadataInfo.pusblished_date}</span></li>
//         }

//         {/* Description */}
//         {/* description */}

//         {/* Dataset language */}
//         <li><span>Dataset Language: </span><span>{metadata.language}</span></li>

//         {/* Geographic Location */}
//         {metadataInfo.geographic_coverage &&
//           <li><span>Geographic location: </span><span>{metadataInfo.geographic_coverage}</span></li>
//         }

//         {/* Date of content */}
//         {metadataInfo.date_of_content &&
//           <li><span>Date of content: </span><span>{metadataInfo.date_of_content}</span></li>
//         }

//         {/* Data type */}
//         {metadataInfo.data_type &&
//           <li><span>Data type: </span><span>{metadataInfo.data_type}</span></li>
//         }

//         {/* Spatial resolution */}
//         {metadataInfo.spatial_resolution &&
//           <li><span>Spatial resolution: </span><span>{metadataInfo.spatial_resolution}</span></li>
//         }

//         {/* Metadata language */}
//         <li><span>Metadata Language: </span><span>{metadata.language}</span></li>

//         {/* License */}
//         {metadataInfo.license &&
//           <li>
//             <span>License: </span>
//             <ReactMarkdown source={metadataInfo.license} className="c-markdown -inline" />
//           </li>
//         }

//         {/* License link */}
//         {metadataInfo.license_link &&
//           <li><span>Link to license: </span><span>{metadataInfo.license_link}</span></li>
//         }

//         {/* Source organizations */}
//         {(metadataInfo.sources || []).length ?
//           <li>
//             <span>Source organizations: </span>
//             <span>
//               <ReactMarkdown
//                 source={metadataInfo.sources.map(s => s['sources-name']).join(', ')}
//                 className="c-markdown -inline"
//               />
//             </span>
//           </li> :
//           <li>
//             <span>Source organizations: </span>
//             <span>{metadataInfo['organization-long']} (<ReactMarkdown source={metadataInfo.organization} className="c-markdown -inline" />)</span>
//           </li>
//         }

//         {/* Learn more link */}
//         {metadataInfo.learn_more_link &&
//           <li><span>Download from Original Source Link: </span>
//             <span>
//               <a href={metadataInfo.learn_more_link} target="_blank" rel="noopener noreferrer">{metadataInfo.learn_more_link}</a>
//             </span>
//           </li>
//         }

//         {/* Download url */}
//         {this.props.download && downloadUrl &&
//           <li>
//             <span>Download: </span>
//             <span>
//               <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
//                 {downloadUrl.length > 120
//                   ? `${downloadUrl.substring(0, 120)}...`
//                   : downloadUrl
//                 }
//               </a>
//             </span>
//           </li>
//         }

//         {/* Contact */}
//         <li><span>Contact: </span>
//           <span>
//             <a href="mailto:info@prepdata.org">info@prepdata.org</a>
//           </span>
//         </li>

//         {/* /Metadata date creation */}
//         <li>
//           <span>Date of creation: </span>
//           <span>{`${createdAt.getFullYear()}/${createdAt.getMonth() + 1}/${createdAt.getDate()}`}</span>
//         </li>
//       </ul>
//     );
//   }
// }

MetadataInfo.propTypes = {
  dataset: React.PropTypes.object.isRequired
};

MetadataInfo.deafultProps = {
  dataset: {}
};

export default MetadataInfo;
