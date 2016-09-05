import React from 'react';

function Tooltip(props) {
  const classes = ['c-tooltip'];

  return (
    <div className={classes}>
      {props.children}
      <div className="-tooltip-text">{props.text}
      <span className="-pointer"></span>
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  /**
   * Defines the text of the tooltip
   */
  text: React.PropTypes.string
};

export default Tooltip;
