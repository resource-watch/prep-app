import React from 'react';

function MetadataInfo(props) {
  let title = props.data.attributes.message
    ? <li>
      <span>Info: </span>
      <span>{props.data.attributes.message}</span>
    </li>
    : <li>
      <span>Description: </span>
      <span>{props.short
        ? props.data.attributes['short-description']
        : props.data.attributes.description}
      </span>
    </li>;
  return (
    <ul>

      {title}

      {props.data.attributes.organization &&
        <li>
          <span>Organization: </span>
          <span>{props.data.attributes.organization}</span>
        </li>
      }
      {props.data.attributes.license &&
        <li>
          <span>License: </span>
          <span>{props.data.attributes.license}</span>
        </li>
      }
      {props.data.attributes.source &&
        <li>
          <span>Source: </span>
          <span>
            <a href={props.data.attributes.source} target="_blank">
              {props.data.attributes.source}
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
  short: React.PropTypes.boolean,
  /**
   * Define the metadata info
   */
  data: React.PropTypes.object.isRequired
};

export default MetadataInfo;
