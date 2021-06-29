import React from 'react';
import PropTypes from 'prop-types';
import { logEvent } from 'helpers/analytics';

function Thumbnail(props) {
  const classes = ['c-thumbnail'];
  if (props.border) classes.push('-border');
  if (props.border === 'neutral') classes.push('-border-neutral');

  return (
    <div className={classes.join(' ')}>
      {props.url &&
        <a
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => props.analytics && logEvent(props.analytics.category, props.analytics.action, props.alt)}
        >
          <img
            src={props.src}
            alt={props.alt}
          />
        </a>
      }
      {!props.url &&
        <img
          src={props.src}
          alt={props.alt}
        />
      }
    </div>
  );
}

Thumbnail.propTypes = {
  /**
   * Define the color of the border
   * Accepted values:
   *  - "": the color depends on the theme (i.e. prop without value)
   *  - "neutral": the color is grey
   * Default: no border (i.e. prop not defined)
   */
  border: PropTypes.any,
  /**
   * Define the link url
   */
  url: PropTypes.string,
  /**
   * Define the img src attribute
   */
  src: PropTypes.string,
  /**
   * Define the img alt attribute
   */
  alt: PropTypes.string,
  /**
   * Define the category and action for the analytics
   * event
   */
  analytics: PropTypes.shape({
    category: PropTypes.string,
    action: PropTypes.string
  })
};

export default Thumbnail;
