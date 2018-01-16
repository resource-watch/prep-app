import React from 'react';
import PropTypes from 'prop-types';

import LayerOpacitySelector from 'components/legend/layer-opacity-selector';
import LegendMultiLayerSelector from 'components/legend/legend-multi-layer-selector';
import Icon from 'components/ui/Icon';

import './legend-actions-style.scss';

export const LegendActions = ({ layerSpec, onOpacity, onVisibility, onInfo, onClose }) => (
  <div className="c-legend-actions">
    <LayerOpacitySelector
      layerSpec={layerSpec}
      onOpacityChange={onOpacity}
    />

    {layerSpec.provider !== 'nexgddp' && layerSpec.layers.length > 1 &&
      <LegendMultiLayerSelector
        layerSpec={layerSpec}
      />
    }

    <button
      type="button"
      className={layerSpec.visibility ? '' : '-active'}
      onClick={() => onVisibility(layerSpec)}
    >
      {layerSpec.visibility ?
        <Icon name="icon-hide" className="-normal" /> :
        <Icon name="icon-show" className="-normal" />}
    </button>
    <button
      type="button"
      className={layerSpec.isSelected ? '-active' : ''}
      onClick={() => onInfo(layerSpec)}
    >
      {layerSpec.isSelected ?
        <Icon name="icon-info" className="-normal" /> :
        <Icon name="icon-info" className="-normal" />}
    </button>
    <button
      type="button"
      onClick={() => onClose(layerSpec)}
    >
      <Icon name="icon-cross" className="-normal" />
    </button>
  </div>
);

LegendActions.propTypes = {
  layerSpec: PropTypes.object,
  onOpacity: PropTypes.func,
  onVisibility: PropTypes.func,
  onInfo: PropTypes.func,
  onClose: PropTypes.func
};

LegendActions.defaultProps = {
  onOpacity: () => {},
  onVisibility: () => {},
  onInfo: () => {},
  onClose: () => {}
};

export default LegendActions;
