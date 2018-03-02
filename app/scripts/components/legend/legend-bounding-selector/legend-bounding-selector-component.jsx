import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import Icon from 'components/ui/Icon';

import 'rc-tooltip/assets/bootstrap_white.css';

const LegendBoundingSelector = (props) => {
  const { onFitBounds, layerSpec, isTooltipOpen } = props;

  const tooltipContent = (
    <div className="tooltip-content">
      <h5 className="title">Zoom to bounds</h5>
    </div>
  );

  return (
    <div className="c-legend-bounding-selector">
      <Tooltip
        overlay={tooltipContent}
        placement="bottom"
        trigger={isTooltipOpen ? '' : 'hover'}
        mouseEnterDelay={0.4}
      >

        <button
          type="button"
          onClick={() => onFitBounds(layerSpec)}
        >
          <Icon name="icon-bbox" className="-normal" />
        </button>

      </Tooltip>
    </div>
  );
};

LegendBoundingSelector.propTypes = {
  isTooltipOpen: PropTypes.bool,
  layerSpec: PropTypes.object,
  onFitBounds: PropTypes.func
};

export default LegendBoundingSelector;
