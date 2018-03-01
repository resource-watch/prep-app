import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip/dist/rc-tooltip';
import Icon from 'components/ui/Icon';

import 'rc-tooltip/assets/bootstrap_white.css';
import './legend-bounding-selector-styles.scss';

const LegendBoundingSelector = (props) => {
  const { onFitBounds, layerSpec, tooltipsOpen } = props;

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
        trigger={tooltipsOpen ? '' : 'hover'}
        overlayClassName="c-legend-multi-layer-selector"
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
  tooltipsOpen: PropTypes.bool,
  layerSpec: PropTypes.object,
  onFitBounds: PropTypes.func
};

export default LegendBoundingSelector;
