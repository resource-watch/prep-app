import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import Icon from 'components/ui/Icon';

import 'rc-tooltip/assets/bootstrap_white.css';

const LegendInfoSelector = (props) => {
  const { onClickInfo, layerSpec, isTooltipOpen, isActive } = props;

  const tooltipContent = (
    <div className="tooltip-content">
      <h5 className="title">Information</h5>
    </div>
  );

  return (
    <div className="c-legend-info-selector">
      <Tooltip
        overlay={tooltipContent}
        placement="bottom"
        trigger={isTooltipOpen ? '' : 'hover'}
        mouseEnterDelay={0.4}
      >

        <button
          className={isActive ? '-active' : ''}
          type="button"
          onClick={() => onClickInfo(layerSpec)}
        >
          <Icon name="icon-info" className="-normal" />
        </button>

      </Tooltip>
    </div>
  );
};

LegendInfoSelector.propTypes = {
  isTooltipOpen: PropTypes.bool,
  layerSpec: PropTypes.object,
  onClickInfo: PropTypes.func
};

export default LegendInfoSelector;
