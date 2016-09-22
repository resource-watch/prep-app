import React from 'react';

class Tooltip extends React.Component {

  render() {
    const visibility = this.props.hidden ? '-hidden' : '-visible';
    let styles = {
      top: this.props.position.top,
      left: this.props.position.left,
      width: this.props.width !== 'auto' ? this.props.width + 'px' : this.props.width
    };

    if (this.props.padding) styles['padding'] = this.props.padding;

    // pointer's border must be 10% of the tooltiptext's width. Defaults to 10px
    const border = this.props.width !== 'auto' ? this.props.width * 0.1 : 10;

    return (
      <div className={`c-tooltip ${visibility} ${this.props.scroll ? '-scroll' : ''}`} style={styles}>
        <div className="tooltip-text">
          {this.props.text}
        </div>
      </div>
    );
  }
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
  scroll: React.PropTypes.bool
};

export default Tooltip;
