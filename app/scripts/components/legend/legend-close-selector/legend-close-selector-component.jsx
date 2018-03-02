import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import Icon from 'components/ui/Icon';

import 'rc-tooltip/assets/bootstrap_white.css';

const LegendCloseSelector = (props) => {
  const { onClose, layerSpec, isTooltipOpen } = props;

  const tooltipContent = (
    <div className="tooltip-content">
      <h5 className="title">Close</h5>
    </div>
  );

  return (
    <div className="c-legend-close-selector">
      <Tooltip
        overlay={tooltipContent}
        placement="bottom"
        trigger={isTooltipOpen ? '' : 'hover'}
        mouseEnterDelay={0.4}
      >

        <button
          type="button"
          onClick={() => onClose(layerSpec)}
        >
          <Icon name="icon-cross" className="-normal" />
        </button>

      </Tooltip>
    </div>
  );
};

LegendCloseSelector.propTypes = {
  isTooltipOpen: PropTypes.bool,
  layerSpec: PropTypes.object,
  onClose: PropTypes.func
};

export default LegendCloseSelector;
