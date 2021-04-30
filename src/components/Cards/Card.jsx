import React from 'react';
import PropTypes from 'prop-types';

function Card(props) {
  const classes = ['c-card'];

  if (props.inverse) classes.push('-inverse');
  if (props.border) classes.push('-border');
  if (props.border === 'neutral') classes.push('-border-neutral');

  return (
    <div className={classes.join(' ')}>
      {props.children}
    </div>
  );
}

Card.propTypes = {
  /**
   * Define the color of the content
   * Accepted values:
   * 	- true:  the content color is adapted for darker background
   * 	- false: the content color is adapted for lighter background
   * Default: false
   */
  inverse: PropTypes.bool,
  /**
   * Define the color of the border
   * Accepted values:
   * 	- "": the color depends on the theme (i.e. prop without value)
   * 	- "neutral": the color is grey
   * Default: no border (i.e. prop not defined)
   */
  border: PropTypes.any,
  /**
   * Define the text content of the button
   * Required
   */
  children: PropTypes.array.isRequired
};

export default Card;
