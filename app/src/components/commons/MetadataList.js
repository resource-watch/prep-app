import React from 'react';
import Title from './Title';

function MetadataInfo(props) {
  return (
    <div className="c-metadata-list">
      <Title type="content" subtitle={{ title: props.data.attributes.subtitle }}>
        {props.data.attributes.title}
      </Title>
      <ul className="list">
        <li>
          <span>Description: </span>
          <span>{props.data.attributes.description}</span>
        </li>
        <li>
          <span>Organization: </span>
          <span>{props.data.attributes.organization}</span>
        </li>
        <li>
          <span>License: </span>
          <span>{props.data.attributes.license}</span>
        </li>
        <li>
          <span>Source: </span>
          <span>
            <a href={props.data.attributes.source} target="_blank">
              {props.data.attributes.source}
            </a>
          </span>
        </li>
      </ul>
    </div>
  );
}

MetadataInfo.propTypes = {
  /**
   * Define the metadata info
   */
  data: React.PropTypes.object.isRequired
};

export default MetadataInfo;
