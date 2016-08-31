import React from 'react';

function Thumbnail(props) {
  const classes = ['c-thumbnail'];
  if (props.border) classes.push('-border');
  if (props.border === 'neutral') classes.push('-border-neutral');

  return (
    <div className={classes.join(' ')}>
      {props.url &&
        <a href={props.url} target="_blank">
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
  border: React.PropTypes.any,
  /**
   * Define the link url
   */
  url: React.PropTypes.string,
  /**
   * Define the img src attribute
   */
  src: React.PropTypes.string,
  /**
   * Define the img alt attribute
   */
  alt: React.PropTypes.string
};

export default Thumbnail;
