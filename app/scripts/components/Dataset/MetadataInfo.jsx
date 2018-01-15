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

      {(info.organization_long && info.organization_long !== '') &&
        <li>
          <span>Organization: </span>
          <span>{info.organization_long}</span>
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

MetadataInfo.propTypes = {
  dataset: React.PropTypes.object.isRequired
};

MetadataInfo.deafultProps = {
  dataset: {}
};

export default MetadataInfo;
