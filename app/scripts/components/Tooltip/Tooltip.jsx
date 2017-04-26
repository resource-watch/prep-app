import React from 'react';

function Tooltip(props) {
  const visibility = props.hidden ? '-hidden' : '-visible';
  const styles = {
    top: props.position.top,
    left: props.position.left,
    width: props.width !== 'auto' ? `${props.width}px` : props.width
  };

  if (props.padding) styles.padding = props.padding;

  // pointer's border must be 10% of the tooltiptext's width. Defaults to 10px
  // const border = props.width !== 'auto' ? props.width * 0.1 : 10;

  return (
    <div className={`c-tooltip ${visibility} ${props.scroll ? '-scroll' : ''}`} style={styles}>
      <div className="tooltip-text">
        {props.text}
      </div>
    </div>
  );
}


Tooltip.propTypes = {
  /**
   * Define the text of the tooltip
   */
  text: React.PropTypes.any,
  /**
   * Define whether the tooltip is hidden or not
   */
  hidden: React.PropTypes.bool,
  /**
   * Define the position of the target element on the viewport
   */
  position: React.PropTypes.object,
  /**
   * Define the width of the tooltip
   */
  width: React.PropTypes.string,
  /**
   * Define if want scroll in the tooltip
   */
  scroll: React.PropTypes.bool,
  /**
   * Define padding
   */
  padding: React.PropTypes.any
};

export default Tooltip;
