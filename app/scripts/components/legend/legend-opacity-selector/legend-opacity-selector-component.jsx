import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import SliderTooltip from 'components/Tooltip/SliderTooltip';
import Icon from 'components/ui/Icon';

import 'rc-tooltip/assets/bootstrap_white.css';
import './legend-opacity-selector-styles.scss';


class LegendOpacitySelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visibilityHover: false,
      visibilityClick: false
    }
  }

  toggleVisibilityOnClick(visible) {
    this.setState({visibilityHover: false});
    this.setState({visibilityClick: visible});
    this.props.onVisibleChange({isOpacityVisible: visible});
  }

  render() {
    const {
      layerSpec,
      onOpacityChange,
      onVisibleChange,
      isOpacityVisible,
      isTooltipOpen
    } = this.props;

    const { opacity, dataset } = layerSpec;

    const {visibilityClick, visibilityHover} = this.state;

    const buttonClass = classnames({
      '-active': isOpacityVisible,
    });

    const tooltipContentClick = (
      <div className="tooltip-content">
        <h5 className="title">Opacity</h5>
        <SliderTooltip
          options={{
            defaultValue: opacity * 100,
            min: 0,
            max: 100,
            step: 1
          }}
          onChange={value => onOpacityChange({ id: dataset, opacity: value / 100 })}
          onClose={() => onVisibleChange({isOpacityVisible: false})}
        />
      </div>
    );

    const tooltipContentHover = (
      <div className="tooltip-content">
        <h5 className="title">Opacity</h5>
      </div>
    );

    return (
      <div className="c-legend-opacity-selector">
        <Tooltip
          overlay={tooltipContentClick}
          placement="bottom"
          trigger={'click'}
          onVisibleChange={visible => this.toggleVisibilityOnClick(visible)}
        >
          <Tooltip
            visible={!visibilityClick && visibilityHover}
            overlay={tooltipContentHover}
            placement="bottom"
            trigger={isTooltipOpen ? '' : 'hover'}
            mouseEnterDelay={0.4}
            onVisibleChange={visible=> this.setState({visibilityHover: visible})}
          >
            <button
              type="button"
              className={buttonClass}
            >
              <Icon name="icon-opacity" className="-normal" />
            </button>
          </Tooltip>
        </Tooltip>
      </div>
    );
  }
};

LegendOpacitySelector.propTypes = {
  isOpacityVisible: PropTypes.bool,
  isTooltipOpen: PropTypes.bool,
  layerSpec: PropTypes.object,
  onOpacityChange: PropTypes.func,
  onVisibleChange: PropTypes.func
};

export default LegendOpacitySelector;
