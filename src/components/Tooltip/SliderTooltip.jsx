import React from 'react';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';

// Components
import Slider from 'rc-slider';

class SliderTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };

    // Bindings
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onMouseDown);
  }

  onMouseDown(e) {
    const clickOutside = this.el && this.el.contains && !this.el.contains(e.target);
    if (clickOutside) {
      this.props.onClose();
    }
  }

  onChange() {
    const { value } = this.state;
    this.props.onChange(value);
  }

  onReset() {
    const { max } = this.props.options;
    this.setState({ value: max }, () => this.props.onChange(this.state.value));
  }

  render() {
    const { className, options, title } = this.props;

    return (
      <div className="c-explore-slider-tooltip" ref={(node) => { this.el = node; }}>
        {title && <h3 className="title">{title}</h3>}
        <Slider
          className={className}
          min={options.min}
          max={options.max}
          step={options.step}
          value={this.state.value !== null ? this.state.value : options.defaultValue}
          defaultValue={this.state.value !== null ? this.state.value : options.defaultValue}
          onChange={value => this.setState({ value })}
          onAfterChange={this.onChange}
        />
        <div className="actions-container">
          <button className="c-button -primary" onClick={() => this.onReset()}>Reset</button>
        </div>
      </div>
    );
  }
}

SliderTooltip.propTypes = {
  // Layer group
  className: PropTypes.string,
  options: PropTypes.object,
  title: PropTypes.string,
  // Callback to call when the layer changes with
  // the ID of the dataset and the ID of the layer
  onChange: PropTypes.func.isRequired,
  // Callback to close the tooltip
  onClose: PropTypes.func.isRequired
};

SliderTooltip.defaultProps = {
  options: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 100
  }
};

export default SliderTooltip;
