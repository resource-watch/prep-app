import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import Icon from 'components/ui/Icon';

import 'rc-tooltip/assets/bootstrap_white.css';

const LegendVisibilitySelector = (props) => {
  const { onVisibility, layerSpec, isTooltipOpen, isVisible } = props;

  const tooltipContent = (
    <div className="tooltip-content">
      <h5 className="title">Toggle visibility</h5>
    </div>
  );

  return (
    <div className="c-legend-visibility-selector">
      <Tooltip
        overlay={tooltipContent}
        placement="bottom"
        trigger={isTooltipOpen ? '' : 'hover'}
        mouseEnterDelay={0.4}
      >

        <button
          type="button"
          className={isVisible ? '' : '-active'}
          onClick={() => onVisibility(layerSpec)}
        >
          {isVisible ?
            <Icon name="icon-hide" className="-normal" /> :
            <Icon name="icon-show" className="-normal" />}
        </button>

      </Tooltip>
    </div>
  );
};

LegendVisibilitySelector.propTypes = {
  isTooltipOpen: PropTypes.bool,
  layerSpec: PropTypes.object,
  onVisibility: PropTypes.func
};

export default LegendVisibilitySelector;
