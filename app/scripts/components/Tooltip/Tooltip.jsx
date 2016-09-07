import React from 'react';

class Tooltip extends React.Component {

  render() {
    let classes = this.props.hidden ? '-tooltip-text -hidden' : '-tooltip-text -visible';
    let styles = {
      top: this.props.position.top,
      left: this.props.position.left,
      width: this.props.width
    };
    return (
      <div className="c-tooltip">
        <div className={classes} style={styles}>{this.props.text}
          <span className="-pointer"></span>
        </div>
      </div>
    );
  }
}


Tooltip.propTypes = {
  /**
   * Define the text of the tooltip
   */
  text: React.PropTypes.string,
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
  width: React.PropTypes.string
};

export default Tooltip;
