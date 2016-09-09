import React from 'react';

function Button(props) {
  const classes = ['c-button'];

  if (props.themeColor) classes.push('-theme-color');
  if (props.inverse) classes.push('-inverse');
  if (props.alternative) classes.push('-alternative');
  if (props.border) classes.push('-border');
  if (props.border === 'neutral') classes.push('-border-neutral');
  if (props.border === 'alternative') classes.push('-border-alternative');
  if (props.fill) classes.push('-fill');
  if (props.action) classes.push('-action');
  if (props.icon) classes.push('-icon');

  return (
    <button
      className={classes.join(' ')}
      onClick={props.click || (() => {})}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  /**
   * Define the color of the button's content
   * Accepted values:
   *  - true: use the theme color
   *  - false: use a dark blue color
   * Default: false
   */
  themeColor: React.PropTypes.bool,
  /**
   * Define the color of the button's content
   * Accepted values:
   * 	- true:  the button's content is white
   * 	- false: the button uses the color previously defined
   * Default: false
   */
  inverse: React.PropTypes.bool,
  /**
   * Define the color of the button's content
   * Accepted values:
   * 	- true:  the button's content is button secondary yellow
   * 	- false: the button uses the color previously defined
   * Default: false
   */
  alternative: React.PropTypes.bool,
  /**
   * Define the color of the border of the button
   * Accepted values:
   *  - "": theme color (i.e. prop has no value)
   * 	- "neutral": dark blue
   * 	- "alternative": button secondary yellow
   * Default: no border (i.e. prop not defined)
   */
  border: React.PropTypes.any,
  /**
   * TODO: write doc for that
   */
  action: React.PropTypes.any,
  /**
   * Set styles for circle icon button
   */
  icon: React.PropTypes.bool,
  /**
   * Define the filling of the button
   * Accepted values:
   * 	- true:  the button is filled with the same color of the border
   * 					 (it's not compatible with the inverse option)
   * 	- false: the button has a transparent background
   * Default: false
   */
  fill: React.PropTypes.bool,
  /**
   * Define the text content of the button
   * Required
   */
  children: React.PropTypes.any.isRequired,
  /**
   * Define click handler function
   */
  click: React.PropTypes.func
};

export default Button;
