import React from 'react';
import PropTypes from 'prop-types';
import IFrame from '../IFrame';

function EmbedMap(props) {
  return (
    <div className="c-embed-map">
      {props.title && <h3>{props.title}</h3>}
      {props.legend && <legend>{props.legend}</legend>}
      <IFrame src={props.url} />
    </div>
  );
}

EmbedMap.propTypes = {
  /**
   * Define map title
   */
  title: PropTypes.string,
  /**
   * Define map subtitle
   */
  legend: PropTypes.string,
  /**
   * Define embed map url
   */
  url: PropTypes.string.isRequired
};

export default EmbedMap;
