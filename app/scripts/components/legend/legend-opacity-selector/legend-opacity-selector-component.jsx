import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import SliderTooltip from 'components/Tooltip/SliderTooltip';
import Icon from 'components/ui/Icon';

import 'rc-tooltip/assets/bootstrap_white.css';
import './legend-opacity-selector-styles.scss';


const LegendOpacitySelector = (props) => {
  const {
    layerSpec,
    onOpacityChange,
    onVisibleChange,
    visibility
  } = props;
  const { opacity, dataset } = layerSpec;

  const buttonClass = classnames({
    '-active': visibility
  });

  const tooltipContent = (
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
        onClose={() => onVisibleChange(false)}
      />
    </div>
  );

  return (
    <div className="c-legend-opacity-selector">
      <Tooltip
        overlay={tooltipContent}
        placement="bottom"
        trigger="click"
        overlayClassName="c-legend-opacity-selector"
        onVisibleChange={onVisibleChange}
      >
        <button
          type="button"
          onClick={() => !visibility && onVisibleChange(true)}
          className={buttonClass}
        >
          <Icon name="icon-opacity" className="-normal" />
        </button>
      </Tooltip>
    </div>
  );
};

LegendOpacitySelector.propTypes = {
  visibility: PropTypes.bool,
  layerSpec: PropTypes.object,
  onOpacityChange: PropTypes.func,
  onVisibleChange: PropTypes.func
};

export default LegendOpacitySelector;
